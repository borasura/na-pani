CREATE OR REPLACE FUNCTION log_task_changes() 
RETURNS TRIGGER AS $$
BEGIN
    -- Check if any of the fields have changed
    IF NEW.title IS DISTINCT FROM OLD.title THEN
        INSERT INTO tasks_history (task_id, change_type, changed_by, previous_values, new_values, created_at)
        VALUES (NEW.id, 'title', NEW.updated_by, OLD.title, NEW.title, NOW());
    END IF;

    IF NEW.description IS DISTINCT FROM OLD.description THEN
        INSERT INTO tasks_history (task_id, change_type, changed_by, previous_values, new_values, created_at)
        VALUES (NEW.id, 'description', NEW.updated_by, OLD.description, NEW.description, NOW());
    END IF;

    IF NEW.status IS DISTINCT FROM OLD.status THEN
        INSERT INTO tasks_history (task_id, change_type, changed_by, previous_values, new_values, created_at)
        VALUES (NEW.id, 'status', NEW.updated_by, OLD.status, NEW.status, NOW());
    END IF;

    IF NEW.priority IS DISTINCT FROM OLD.priority THEN
        INSERT INTO tasks_history (task_id, change_type, changed_by, previous_values, new_values, created_at)
        VALUES (NEW.id, 'priority', NEW.updated_by, OLD.priority, NEW.priority, NOW());
    END IF;

    IF NEW.due_date IS DISTINCT FROM OLD.due_date THEN
        INSERT INTO tasks_history (task_id, change_type, changed_by, previous_values, new_values, created_at)
        VALUES (NEW.id, 'due_date', NEW.updated_by, OLD.due_date, NEW.due_date, NOW());
    END IF;

    IF NEW.assigned_to IS DISTINCT FROM OLD.assigned_to THEN
        INSERT INTO tasks_history (task_id, change_type, changed_by, previous_values, new_values, created_at)
        VALUES (NEW.id, 'assigned_to', NEW.updated_by, OLD.assigned_to, NEW.assigned_to, NOW());
    END IF;

    -- Return the new record
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;


CREATE TRIGGER task_changes_trigger
AFTER UPDATE ON tasks
FOR EACH ROW
EXECUTE FUNCTION log_task_changes();