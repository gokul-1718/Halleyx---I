package com.example.workflow.engine;

import java.util.Map;

public class RuleEvaluator {

    public static boolean evaluate(String condition, Map<String, Object> context) {
        // Simple implementation for demonstration
        // In production, use a proper expression language like Spring Expression Language (SpEL)
        // or JavaScript engine
        if (condition.contains("&&")) {
            String[] parts = condition.split("&&");
            return evaluate(parts[0].trim(), context) && evaluate(parts[1].trim(), context);
        } else if (condition.contains("||")) {
            String[] parts = condition.split("\\|\\|");
            return evaluate(parts[0].trim(), context) || evaluate(parts[1].trim(), context);
        } else {
            return evaluateSimple(condition, context);
        }
    }

    private static boolean evaluateSimple(String condition, Map<String, Object> context) {
        // Parse simple conditions like amount > 100, country == 'US'
        String[] parts = condition.split(" ");
        if (parts.length == 3) {
            String left = parts[0];
            String op = parts[1];
            String right = parts[2];

            Object leftValue = context.get(left);
            if (leftValue == null) return false;

            switch (op) {
                case ">":
                    return Double.parseDouble(leftValue.toString()) > Double.parseDouble(right);
                case "<":
                    return Double.parseDouble(leftValue.toString()) < Double.parseDouble(right);
                case "==":
                    if (right.startsWith("'") && right.endsWith("'")) {
                        right = right.substring(1, right.length() - 1);
                    }
                    return leftValue.toString().equals(right);
                case "!=":
                    if (right.startsWith("'") && right.endsWith("'")) {
                        right = right.substring(1, right.length() - 1);
                    }
                    return !leftValue.toString().equals(right);
                default:
                    return false;
            }
        }
        return false;
    }
}