package com.example.workflow.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "rules")
@Data
public class Rule {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long stepId;   // SIMPLE mapping (no relation)

    private Integer priority;

    @Column(columnDefinition = "TEXT")
    private String expression;

    private Long nextStepId;
}