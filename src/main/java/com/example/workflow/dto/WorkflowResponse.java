package com.example.workflow.dto;

import lombok.Data;
import java.time.LocalDateTime;

@Data
public class WorkflowResponse {
    private Long id;
    private String name;
    private String inputSchema;
    private Long startStepId;
    private Integer version;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}