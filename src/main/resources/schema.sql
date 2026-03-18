-- SQL Schema for Workflow Automation System

CREATE DATABASE IF NOT EXISTS workflow_db;
USE workflow_db;

CREATE TABLE workflows (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    input_schema JSON,
    start_step_id BIGINT,
    version INT NOT NULL DEFAULT 1,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE steps (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    type ENUM('TASK', 'APPROVAL', 'NOTIFICATION') NOT NULL,
    description TEXT,
    workflow_id BIGINT NOT NULL,
    FOREIGN KEY (workflow_id) REFERENCES workflows(id) ON DELETE CASCADE
);

CREATE TABLE rules (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    condition TEXT NOT NULL,
    next_step_id BIGINT NOT NULL,
    priority INT NOT NULL DEFAULT 1,
    name VARCHAR(255),
    step_id BIGINT NOT NULL,
    FOREIGN KEY (step_id) REFERENCES steps(id) ON DELETE CASCADE
);

CREATE TABLE executions (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    workflow_id BIGINT NOT NULL,
    workflow_version INT NOT NULL,
    status ENUM('PENDING', 'RUNNING', 'COMPLETED', 'FAILED', 'CANCELLED') NOT NULL,
    input_data JSON,
    current_step_id BIGINT,
    retries INT NOT NULL DEFAULT 0,
    logs JSON,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (workflow_id) REFERENCES workflows(id)
);

CREATE TABLE step_logs (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    execution_id BIGINT NOT NULL,
    step_id BIGINT NOT NULL,
    status ENUM('STARTED', 'COMPLETED', 'FAILED', 'SKIPPED') NOT NULL,
    input_data JSON,
    output_data JSON,
    error_message TEXT,
    rule_evaluations JSON,
    executed_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (execution_id) REFERENCES executions(id) ON DELETE CASCADE,
    FOREIGN KEY (step_id) REFERENCES steps(id)
);