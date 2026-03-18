package com.example.workflow.dto;

import lombok.Data;

@Data
public class WorkflowRequest {
    private String name;
    private String inputSchema;
    private Long startStepId;
}