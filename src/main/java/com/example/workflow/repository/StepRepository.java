package com.example.workflow.repository;

import com.example.workflow.entity.Step;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface StepRepository extends JpaRepository<Step, Long> {

    List<Step> findByWorkflowId(Long workflowId);
}
