package com.example.workflow.controller;

import com.example.workflow.entity.Rule;
import com.example.workflow.repository.RuleRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/rules")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class RuleController {

    private final RuleRepository ruleRepository;

    @PostMapping
    public Rule createRule(@RequestBody Rule rule) {
        return ruleRepository.save(rule);
    }
}