#!/usr/bin/env bash

# Set PATH explicitly (for cronjobs or restricted environments)
export PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin

# Configuration
readonly REPO_DIR="/home/transform.interviewaxis.com"  # Path to your local repository
readonly GITHUB_REPO="https://github.com/intervieewaxis/interview_transform.git"  # GitHub repository URL
readonly BRANCH="main"  # Branch to check for changes
readonly LOG_DIR="/home/transform.interviewaxis.com/logs"  # Directory to store logs
readonly MAX_LOG_SIZE=$((1024 * 1024 * 1024))  # 1GB in bytes
readonly CONTAINERS=("transform.interviewaxis.com-chrome-1" "transform.interviewaxis.com-minio-1" "transform.interviewaxis.com-app-1" "transform.interviewaxis.com-postgres-1")  # List of containers to monitor
readonly LOCK_FILE="/tmp/check_and_build.lock"  # Lock file to prevent multiple executions

# Enable strict error handling
set -euo pipefail

# Get current date for log file name
readonly CURRENT_DATE=$(date +"%Y-%m-%d")
readonly LOG_FILE="$LOG_DIR/check_and_build_$CURRENT_DATE.log"

# Function to log messages with timestamps and emojis
log() {
    local timestamp
    timestamp=$(date +"%Y-%m-%d %H:%M:%S")
    echo -e "✨ [${timestamp}] $1" >> "$LOG_FILE"
}

# Function to check if a container is running
is_container_running() {
    local container_name="$1"
    docker ps -q -f name="$container_name" -f status=running > /dev/null
}

# Function to rebuild and restart containers
rebuild_containers() {
    log "🔧 Rebuilding and restarting all containers..."
    if /usr/local/bin/docker-compose -f compose.yml up --build -d >> "$LOG_FILE" 2>&1; then
        log "✅ Docker containers rebuilt and restarted successfully."
    else
        log "❌ Failed to rebuild and restart Docker containers."
        exit 1
    fi
}

# Function to clean up the lock file
cleanup() {
    rm -f "$LOCK_FILE"
    log "🔒 Lock file removed."
}

# Main function
main() {
    # Create log directory if it doesn't exist
    mkdir -p "$LOG_DIR"

    # Check if the script is already running
    if [[ -f "$LOCK_FILE" ]]; then
        log "🚫 Script is already running. Exiting."
        exit 1
    else
        # Create a lock file
        touch "$LOCK_FILE"
        trap cleanup EXIT  # Ensure the lock file is removed on script exit
        log "🔒 Lock file created."
    fi

    # Add a separator at the beginning of each script execution
    echo -e "\n=== 🚀 Script Execution Started 🚀 ===\n" >> "$LOG_FILE"

    # Rotate log file if it exceeds 1GB
    if [[ -f "$LOG_FILE" ]]; then
        local log_size
        log_size=$(stat -c%s "$LOG_FILE")
        if [[ $log_size -ge $MAX_LOG_SIZE ]]; then
            mv "$LOG_FILE" "$LOG_FILE.1"
            log "📦 Log file rotated: $LOG_FILE exceeds 1GB."
        fi
    fi

    # Move to the repository directory
    cd "$REPO_DIR" || { log "❌ Failed to cd to $REPO_DIR."; exit 1; }

    # Fetch the latest changes from the remote repository
    log "🔄 Fetching latest changes from the remote repository..."
    git fetch origin

    # Get the latest commit hash from the remote repository
    local remote_hash
    remote_hash=$(git rev-parse origin/$BRANCH)

    # Get the latest commit hash from the local repository
    local local_hash
    local_hash=$(git rev-parse HEAD)

    # Compare the local and remote commit hashes
    if [[ "$remote_hash" != "$local_hash" ]]; then
        log "🔄 Changes detected in the repository. Pulling latest changes..."
        
        # Pull the latest changes
        if git pull origin "$BRANCH"; then
            log "✅ Successfully pulled latest changes."
            local build_triggered=true
        else
            log "❌ Failed to pull latest changes."
            exit 1
        fi
    else
        log "⏩ No changes detected in the repository. Checking container status..."
        local build_triggered=false
    fi

    # Check if at least one container is not running (only if no Git changes were detected)
    if [[ "$build_triggered" == false ]]; then
        for container in "${CONTAINERS[@]}"; do
            if ! is_container_running "$container"; then
                log "🛑 Container $container is not running. Triggering build..."
                build_triggered=true
                break  # Exit the loop as soon as one non-running container is found
            fi
        done
    fi

    # If build_triggered is true, rebuild and restart all containers
    if [[ "$build_triggered" == true ]]; then
        rebuild_containers
    else
        log "👍 All containers are running. No action needed."
    fi

    # Zip logs older than 7 days
    log "🗜 Zipping logs older than 7 days..."
    find "$LOG_DIR" -name "check_and_build_*.log" -mtime +7 -exec gzip {} \;
    find "$LOG_DIR" -name "check_and_build_*.log.1" -mtime +7 -exec gzip {} \;

    # Add a separator at the end of each script execution
    echo -e "\n=== 🎉 Script Execution Completed 🎉 ===\n" >> "$LOG_FILE"
}

# Run the script
main "$@"
