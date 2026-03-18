package com.example.workflow.repository;

import com.example.workflow.entity.StepLog;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface StepLogRepository extends JpaRepository<StepLog, Long> {

    // 🔥 THIS METHOD MUST EXIST
    List<StepLog> findByExecutionId(Long executionId);
}
