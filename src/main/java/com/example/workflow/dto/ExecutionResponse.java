package com.example.workflow.dto;

import lombok.Data;
import java.time.LocalDateTime;

@Data
public class ExecutionResponse {
    private Long id;
    private Long workflowId;
    private Integer workflowVersion;
    private String status;
    private String inputData;
    private Long currentStepId;
    private Integer retries;
    private String logs;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}