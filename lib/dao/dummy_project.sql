"id","username","email"
"072203a2-89e7-482c-8c0f-cc1694f3eb49","Louis Litt","louis@test.com"
"08496e5f-e6c3-4859-b38f-17bbee45f3c4","Michael Ross","ross@test.com"
"14db61ee-dca1-486b-8718-4f685613c06b","Alex Williams","alex@test.com"
"2c8c456a-fa57-41cd-bc64-398d52265909","Donna Paulsen","donna@test.com"
"5758a2cf-eaae-4dbe-b3e1-6022c285e0bb","Jessica Pearson","jessica@test.com"
"68645753-2887-4572-84a3-166afed6a5d3","Kyle Durant","kyle@test.com"
"7b782ab7-ca01-47c8-8232-948e65d90ea0","Test","test@test.com"
"834e16b9-8b2d-4122-aecf-797f6d281120","Edith Ross","edith@test.com"
"8b26d04b-5dec-4a31-a12b-cd4d206392bd","Harvey Specter","harvey@test.com"
"8fe156f5-c8f0-4c6d-ac58-211b62d7bbcc","Jenny Griffith","jenny@test.com"
"aacb056f-6aca-44ce-8ca9-e532cdf48b3b","Trevor Evans","trevor@test.com"
"b44f1307-e310-4326-972b-8dc543bcbcf7","Samantha Wheeler","samantha@test.com"
"bfc92523-e055-49e6-979b-06830b0fe754","Rachel Zane","rachel@test.com"
"f9880ccb-9fbc-4a7c-82c3-4e236bf1151f","Katrina Bennett","katrina@test.com"

INSERT INTO projects (id, name, project_code, description, start_date, end_date, status, priority, color_code, owner, created_by)
VALUES ('9a7b1c2d-3e4f-5064-7283-94a5b6c7d8e9', 'LA Expansion', 'LA_2025', 'Jessica and Senior partner project to expand the firm to LA', '2024-01-01', '2025-12-31', 'Planning', 'Medium', '#3b82f6', '8b26d04b-5dec-4a31-a12b-cd4d206392bd', '8b26d04b-5dec-4a31-a12b-cd4d206392bd');

INSERT INTO project_permissions (project_id, user_id, role) VALUES ('9a7b1c2d-3e4f-5064-7283-94a5b6c7d8e9', '8b26d04b-5dec-4a31-a12b-cd4d206392bd', 'Owner');
INSERT INTO project_permissions (project_id, user_id, role) VALUES ('9a7b1c2d-3e4f-5064-7283-94a5b6c7d8e9', '072203a2-89e7-482c-8c0f-cc1694f3eb49', 'Editor');
INSERT INTO project_permissions (project_id, user_id, role) VALUES ('9a7b1c2d-3e4f-5064-7283-94a5b6c7d8e9', '08496e5f-e6c3-4859-b38f-17bbee45f3c4', 'Editor');
INSERT INTO project_permissions (project_id, user_id, role) VALUES ('9a7b1c2d-3e4f-5064-7283-94a5b6c7d8e9', '14db61ee-dca1-486b-8718-4f685613c06b', 'Commenter');
INSERT INTO project_permissions (project_id, user_id, role) VALUES ('9a7b1c2d-3e4f-5064-7283-94a5b6c7d8e9', '2c8c456a-fa57-41cd-bc64-398d52265909', 'Viewer');
INSERT INTO project_permissions (project_id, user_id, role) VALUES ('9a7b1c2d-3e4f-5064-7283-94a5b6c7d8e9', '5758a2cf-eaae-4dbe-b3e1-6022c285e0bb', 'Viewer');
INSERT INTO project_permissions (project_id, user_id, role) VALUES ('9a7b1c2d-3e4f-5064-7283-94a5b6c7d8e9', '68645753-2887-4572-84a3-166afed6a5d3', 'Commenter');
INSERT INTO project_permissions (project_id, user_id, role) VALUES ('9a7b1c2d-3e4f-5064-7283-94a5b6c7d8e9', '834e16b9-8b2d-4122-aecf-797f6d281120', 'Editor');
INSERT INTO project_permissions (project_id, user_id, role) VALUES ('9a7b1c2d-3e4f-5064-7283-94a5b6c7d8e9', '8fe156f5-c8f0-4c6d-ac58-211b62d7bbcc', 'Commenter');
INSERT INTO project_permissions (project_id, user_id, role) VALUES ('9a7b1c2d-3e4f-5064-7283-94a5b6c7d8e9', 'aacb056f-6aca-44ce-8ca9-e532cdf48b3b', 'Viewer');
INSERT INTO project_permissions (project_id, user_id, role) VALUES ('9a7b1c2d-3e4f-5064-7283-94a5b6c7d8e9', 'b44f1307-e310-4326-972b-8dc543bcbcf7', 'Editor');
INSERT INTO project_permissions (project_id, user_id, role) VALUES ('9a7b1c2d-3e4f-5064-7283-94a5b6c7d8e9', 'bfc92523-e055-49e6-979b-06830b0fe754', 'Editor');
INSERT INTO project_permissions (project_id, user_id, role) VALUES ('9a7b1c2d-3e4f-5064-7283-94a5b6c7d8e9', 'f9880ccb-9fbc-4a7c-82c3-4e236bf1151f', 'Editor');

INSERT INTO tasks (project_id, title, description, status, priority, color_code, due_date, created_by, assigned_to) VALUES ('9a7b1c2d-3e4f-5064-7283-94a5b6c7d8e9', 'Prepare Case File for Smith vs. Jones', 'Gather all relevant documents.', 'Done', 'High', '#10b981', '2024-03-15', '8b26d04b-5dec-4a31-a12b-cd4d206392bd', '08496e5f-e6c3-4859-b38f-17bbee45f3c4');
INSERT INTO tasks (project_id, title, description, status, priority, color_code, due_date, created_by, assigned_to) VALUES ('9a7b1c2d-3e4f-5064-7283-94a5b6c7d8e9', 'Draft Motion to Dismiss', 'Prepare the initial draft.', 'In Progress', 'Medium', '#f97316', '2024-04-10', '08496e5f-e6c3-4859-b38f-17bbee45f3c4', '072203a2-89e7-482c-8c0f-cc1694f3eb49');
INSERT INTO tasks (project_id, title, description, status, priority, color_code, due_date, created_by, assigned_to) VALUES ('9a7b1c2d-3e4f-5064-7283-94a5b6c7d8e9', 'Review Contract with Client', 'Go over the terms and conditions.', 'Todo', 'Medium', '#f59e0b', '2024-04-20', '072203a2-89e7-482c-8c0f-cc1694f3eb49', '14db61ee-dca1-486b-8718-4f685613c06b');



INSERT INTO tasks (project_id, title, description, status, priority, color_code, due_date, created_by, assigned_to)
VALUES ('9a7b1c2d-3e4f-5064-7283-94a5b6c7d8e9', 'Prepare Witness Interviews', 'Schedule and conduct interviews.', 'In Progress', 'High', '#ef4444', '2024-03-20', '8b26d04b-5dec-4a31-a12b-cd4d206392bd', '08496e5f-e6c3-4859-b38f-17bbee45f3c4');

INSERT INTO tasks (project_id, title, description, status, priority, color_code, due_date, created_by, assigned_to)
VALUES ('9a7b1c2d-3e4f-5064-7283-94a5b6c7d8e9', 'Review Opposing Counsel Filings', 'Analyze legal arguments.', 'Todo', 'Medium', '#f97316', '2024-04-05', '072203a2-89e7-482c-8c0f-cc1694f3eb49', '08496e5f-e6c3-4859-b38f-17bbee45f3c4');

INSERT INTO tasks (project_id, title, description, status, priority, color_code, due_date, created_by, assigned_to)
VALUES ('9a7b1c2d-3e4f-5064-7283-94a5b6c7d8e9', 'Draft Settlement Proposal', 'Outline terms of settlement.', 'Backlog', 'Low', '#d3d3d3', '2024-04-15', '8b26d04b-5dec-4a31-a12b-cd4d206392bd', '14db61ee-dca1-486b-8718-4f685613c06b');

INSERT INTO tasks (project_id, title, description, status, priority, color_code, due_date, created_by, assigned_to)
VALUES ('9a7b1c2d-3e4f-5064-7283-94a5b6c7d8e9', 'Prepare for Mediation', 'Gather evidence and arguments.', 'In Progress', 'Medium', '#f59e0b', '2024-03-25', '08496e5f-e6c3-4859-b38f-17bbee45f3c4', '2c8c456a-fa57-41cd-bc64-398d52265909');

INSERT INTO tasks (project_id, title, description, status, priority, color_code, due_date, created_by, assigned_to)
VALUES ('9a7b1c2d-3e4f-5064-7283-94a5b6c7d8e9', 'Finalize Legal Brief', 'Edit and submit the brief.', 'Done', 'High', '#10b981', '2024-03-10', '8b26d04b-5dec-4a31-a12b-cd4d206392bd', '072203a2-89e7-482c-8c0f-cc1694f3eb49');

INSERT INTO tasks (project_id, title, description, status, priority, color_code, due_date, created_by, assigned_to)
VALUES ('9a7b1c2d-3e4f-5064-7283-94a5b6c7d8e9', 'Research Case Law', 'Investigate relevant precedents.', 'Todo', 'Medium', '#3b82f6', '2024-04-01', '072203a2-89e7-482c-8c0f-cc1694f3eb49', '834e16b9-8b2d-4122-aecf-797f6d281120');

INSERT INTO tasks (project_id, title, description, status, priority, color_code, due_date, created_by, assigned_to)
VALUES ('9a7b1c2d-3e4f-5064-7283-94a5b6c7d8e9', 'Prepare Client Presentation', 'Create slides and talking points.', 'In Progress', 'High', '#6366f1', '2024-03-30', '08496e5f-e6c3-4859-b38f-17bbee45f3c4', 'b44f1307-e310-4326-972b-8dc543bcbcf7');

INSERT INTO tasks (project_id, title, description, status, priority, color_code, due_date, created_by, assigned_to)
VALUES ('9a7b1c2d-3e4f-5064-7283-94a5b6c7d8e9', 'Negotiate with Opposing Counsel', 'Discuss settlement terms.', 'In Progress', 'Medium', '#a855f7', '2024-04-08', '8b26d04b-5dec-4a31-a12b-cd4d206392bd', 'bfc92523-e055-49e6-979b-06830b0fe754');

INSERT INTO tasks (project_id, title, description, status, priority, color_code, due_date, created_by, assigned_to)
VALUES ('9a7b1c2d-3e4f-5064-7283-94a5b6c7d8e9', 'File Court Documents', 'Submit necessary paperwork.', 'Done', 'High', '#ec4899', '2024-03-05', '072203a2-89e7-482c-8c0f-cc1694f3eb49', 'f9880ccb-9fbc-4a7c-82c3-4e236bf1151f');

INSERT INTO tasks (project_id, title, description, status, priority, color_code, due_date, created_by, assigned_to)
VALUES ('9a7b1c2d-3e4f-5064-7283-94a5b6c7d8e9', 'Review Client Correspondence', 'Respond to client inquiries.', 'Todo', 'Low', '#d3d3d3', '2024-04-12', '8b26d04b-5dec-4a31-a12b-cd4d206392bd', '072203a2-89e7-482c-8c0f-cc1694f3eb49');

INSERT INTO tasks (project_id, title, description, status, priority, color_code, due_date, created_by, assigned_to)
VALUES ('9a7b1c2d-3e4f-5064-7283-94a5b6c7d8e9', 'Prepare Expert Witness Testimony', 'Coordinate with expert.', 'In Progress', 'High', '#ef4444', '2024-03-22', '08496e5f-e6c3-4859-b38f-17bbee45f3c4', '072203a2-89e7-482c-8c0f-cc1694f3eb49');

INSERT INTO tasks (project_id, title, description, status, priority, color_code, due_date, created_by, assigned_to)
VALUES ('9a7b1c2d-3e4f-5064-7283-94a5b6c7d8e9', 'Analyze Financial Documents', 'Review financial statements.', 'Todo', 'Medium', '#f97316', '2024-04-03', '072203a2-89e7-482c-8c0f-cc1694f3eb49', '08496e5f-e6c3-4859-b38f-17bbee45f3c4');

INSERT INTO tasks (project_id, title, description, status, priority, color_code, due_date, created_by, assigned_to)
VALUES ('9a7b1c2d-3e4f-5064-7283-94a5b6c7d8e9', 'Draft Discovery Requests', 'Prepare interrogatories.', 'Backlog', 'Low', '#d3d3d3', '2024-04-18', '8b26d04b-5dec-4a31-a12b-cd4d206392bd', '14db61ee-dca1-486b-8718-4f685613c06b');

INSERT INTO tasks (project_id, title, description, status, priority, color_code, due_date, created_by, assigned_to)
VALUES ('9a7b1c2d-3e4f-5064-7283-94a5b6c7d8e9', 'Prepare for Deposition', 'Outline questions and strategy.', 'In Progress', 'Medium', '#f59e0b', '2024-03-27', '08496e5f-e6c3-4859-b38f-17bbee45f3c4', '2c8c456a-fa57-41cd-bc64-398d52265909');

INSERT INTO tasks (project_id, title, description, status, priority, color_code, due_date, created_by, assigned_to)
VALUES ('9a7b1c2d-3e4f-5064-7283-94a5b6c7d8e9', 'Finalize Settlement Agreement', 'Review and sign agreement.', 'Done', 'High', '#10b981', '2024-03-12', '8b26d04b-5dec-4a31-a12b-cd4d206392bd', '072203a2-89e7-482c-8c0f-cc1694f3eb49');

INSERT INTO tasks (project_id, title, description, status, priority, color_code, due_date, created_by, assigned_to)
VALUES ('9a7b1c2d-3e4f-5064-7283-94a5b6c7d8e9', 'Research Legal Issues', 'Investigate specific legal questions.', 'Todo', 'Medium', '#3b82f6', '2024-03-30', '072203a2-89e7-482c-8c0f-cc1694f3eb49', '834e16b9-8b2d-4122-aecf-797f6d281120');

INSERT INTO tasks (project_id, title, description, status, priority, color_code, due_date, created_by, assigned_to)
VALUES ('9a7b1c2d-3e4f-5064-7283-94a5b6c7d8e9', 'Prepare for Trial', 'Organize evidence and arguments.', 'In Progress', 'High', '#6366f1', '2024-04-01', '08496e5f-e6c3-4859-b38f-17bbee45f3c4', 'b44f1307-e310-4326-972b-8dc543bcbcf7');

INSERT INTO tasks (project_id, title, description, status, priority, color_code, due_date, created_by, assigned_to)
VALUES ('9a7b1c2d-3e4f-5064-7283-94a5b6c7d8e9', 'Negotiate Settlement Terms', 'Discuss final settlement.', 'In Progress', 'Medium', '#a855f7', '2024-04-06', '8b26d04b-5dec-4a31-a12b-cd4d206392bd', 'bfc92523-e055-49e6-979b-06830b0fe754');

INSERT INTO tasks (project_id, title, description, status, priority, color_code, due_date, created_by, assigned_to)
VALUES ('9a7b1c2d-3e4f-5064-7283-94a5b6c7d8e9', 'File Legal Motions', 'Submit motions to the court.', 'Done', 'High', '#ec4899', '2024-03-03', '072203a2-89e7-482c-8c0f-cc1694f3eb49', 'f9880ccb-9fbc-4a7c-82c3-4e236bf1151f');

INSERT INTO tasks (project_id, title, description, status, priority, color_code, due_date, created_by, assigned_to)
VALUES ('9a7b1c2d-3e4f-5064-7283-94a5b6c7d8e9', 'Review Client Documents', 'Analyze client records.', 'Todo', 'Low', '#d3d3d3', '2024-04-10', '8b26d04b-5dec-4a31-a12b-cd4d206392bd', '072203a2-89e7-482c-8c0f-cc1694f3eb49');

INSERT INTO tasks (project_id, title, description, status, priority, color_code, due_date, created_by, assigned_to)
VALUES ('9a7b1c2d-3e4f-5064-7283-94a5b6c7d8e9', 'Prepare Cross-Examination Questions', 'Develop questions for witnesses.', 'In Progress', 'High', '#ef4444', '2024-03-24', '08496e5f-e6c3-4859-b38f-17bbee45f3c4', '072203a2-89e7-482c-8c0f-cc1694f3eb49');

INSERT INTO tasks (project_id, title, description, status, priority, color_code, due_date, created_by, assigned_to)
VALUES ('9a7b1c2d-3e4f-5064-7283-94a5b6c7d8e9', 'Analyze Evidence', 'Review all collected evidence.', 'Todo', 'Medium', '#f97316', '2024-04-01', '072203a2-89e7-482c-8c0f-cc1694f3eb49', '08496e5f-e6c3-4859-b38f-17bbee45f3c4');






INSERT INTO comments (task_id, user_id, content) VALUES ((SELECT id FROM tasks WHERE title = 'Prepare Case File for Smith vs. Jones'), '08496e5f-e6c3-4859-b38f-17bbee45f3c4', 'All documents have been collected and organized.');
INSERT INTO comments (task_id, user_id, content) VALUES ((SELECT id FROM tasks WHERE title = 'Prepare Case File for Smith vs. Jones'), '8b26d04b-5dec-4a31-a12b-cd4d206392bd', 'Great job, Michael. Please ensure all exhibits are clearly labeled.');

INSERT INTO comments (task_id, user_id, content) VALUES ((SELECT id FROM tasks WHERE title = 'Draft Motion to Dismiss'), '072203a2-89e7-482c-8c0f-cc1694f3eb49', 'Draft complete, needs review from Harvey.');
INSERT INTO comments (task_id, user_id, content) VALUES ((SELECT id FROM tasks WHERE title = 'Draft Motion to Dismiss'), '8b26d04b-5dec-4a31-a12b-cd4d206392bd', 'Louis, I have added some edits. Check the attached document.');

INSERT INTO comments (task_id, user_id, content) VALUES ((SELECT id FROM tasks WHERE title = 'Review Contract with Client'), '14db61ee-dca1-486b-8718-4f685613c06b', 'Client has requested changes to clauses 3 and 7.');
INSERT INTO comments (task_id, user_id, content) VALUES ((SELECT id FROM tasks WHERE title = 'Review Contract with Client'), '072203a2-89e7-482c-8c0f-cc1694f3eb49', 'Please provide a summary of the requested changes.');

INSERT INTO comments (task_id, user_id, content) VALUES ((SELECT id FROM tasks WHERE title = 'Prepare for Mediation'), '2c8c456a-fa57-41cd-bc64-398d52265909', 'Mediation scheduled for next week. All documents ready.');
INSERT INTO comments (task_id, user_id, content) VALUES ((SELECT id FROM tasks WHERE title = 'Prepare for Mediation'), '08496e5f-e6c3-4859-b38f-17bbee45f3c4', 'Remember to bring the financial statements.');

INSERT INTO comments (task_id, user_id, content) VALUES ((SELECT id FROM tasks WHERE title = 'Finalize Legal Brief'), '072203a2-89e7-482c-8c0f-cc1694f3eb49', 'Brief submitted to the court.');
INSERT INTO comments (task_id, user_id, content) VALUES ((SELECT id FROM tasks WHERE title = 'Finalize Legal Brief'), '8b26d04b-5dec-4a31-a12b-cd4d206392bd', 'Excellent work, Louis.');

INSERT INTO comments (task_id, user_id, content) VALUES ((SELECT id FROM tasks WHERE title = 'Review Opposing Counsel Filings'), '08496e5f-e6c3-4859-b38f-17bbee45f3c4', 'They are trying to introduce new evidence. We need to counter this.');
INSERT INTO comments (task_id, user_id, content) VALUES ((SELECT id FROM tasks WHERE title = 'Review Opposing Counsel Filings'), '072203a2-89e7-482c-8c0f-cc1694f3eb49', 'Lets schedule an urgent meet.');

INSERT INTO comments (task_id, user_id, content) VALUES ((SELECT id FROM tasks WHERE title = 'Prepare Witness Interviews'), '08496e5f-e6c3-4859-b38f-17bbee45f3c4', 'Witness interviews scheduled for the upcoming week.');
INSERT INTO comments (task_id, user_id, content) VALUES ((SELECT id FROM tasks WHERE title = 'Prepare Witness Interviews'), '8b26d04b-5dec-4a31-a12b-cd4d206392bd', 'Ensure to record the audio.');

INSERT INTO comments (task_id, user_id, content) VALUES ((SELECT id FROM tasks WHERE title = 'Draft Settlement Proposal'), '14db61ee-dca1-486b-8718-4f685613c06b', 'Initial draft is ready for review.');

INSERT INTO comments (task_id, user_id, content) VALUES ((SELECT id FROM tasks WHERE title = 'Prepare Client Presentation'), 'b44f1307-e310-4326-972b-8dc543bcbcf7', 'Presentation slides are ready, just need final approval.');
INSERT INTO comments (task_id, user_id, content) VALUES ((SELECT id FROM tasks WHERE title = 'Prepare Client Presentation'), '08496e5f-e6c3-4859-b38f-17bbee45f3c4', 'Add a slide summarizing the financial impact.');

INSERT INTO comments (task_id, user_id, content) VALUES ((SELECT id FROM tasks WHERE title = 'Negotiate with Opposing Counsel'), 'bfc92523-e055-49e6-979b-06830b0fe754', 'Negotiations ongoing, they are being difficult.');
INSERT INTO comments (task_id, user_id, content) VALUES ((SELECT id FROM tasks WHERE title = 'Negotiate with Opposing Counsel'), '8b26d04b-5dec-4a31-a12b-cd4d206392bd', 'Stand your ground, Samantha.');

INSERT INTO comments (task_id, user_id, content) VALUES ((SELECT id FROM tasks WHERE title = 'File Court Documents'), 'f9880ccb-9fbc-4a7c-82c3-4e236bf1151f', 'Documents filed, confirmation received.');

INSERT INTO comments (task_id, user_id, content) VALUES ((SELECT id FROM tasks WHERE title = 'Review Client Correspondence'), '072203a2-89e7-482c-8c0f-cc1694f3eb49', 'Client has requested an update on the case.');

INSERT INTO comments (task_id, user_id, content) VALUES ((SELECT id FROM tasks WHERE title = 'Prepare Expert Witness Testimony'), '072203a2-89e7-482c-8c0f-cc1694f3eb49', 'Expert witness has confirmed availability.');

INSERT INTO comments (task_id, user_id, content) VALUES ((SELECT id FROM tasks WHERE title = 'Analyze Financial Documents'), '08496e5f-e6c3-4859-b38f-17bbee45f3c4', 'Financial analysis completed, significant discrepancies found.');

INSERT INTO comments (task_id, user_id, content) VALUES ((SELECT id FROM tasks WHERE title = 'Draft Discovery Requests'), '14db61ee-dca1-486b-8718-4f685613c06b', 'Discovery requests drafted, awaiting review.');

INSERT INTO comments (task_id, user_id, content) VALUES ((SELECT id FROM tasks WHERE title = 'Prepare for Deposition'), '2c8c456a-fa57-41cd-bc64-398d52265909', 'Deposition strategy outlined, questions prepared.');

INSERT INTO comments (task_id, user_id, content) VALUES ((SELECT id FROM tasks WHERE title = 'Finalize Settlement Agreement'), '072203a2-89e7-482c-8c0f-cc1694f3eb49', 'Settlement agreement finalized and signed.');

INSERT INTO comments (task_id, user_id, content) VALUES ((SELECT id FROM tasks WHERE title = 'Research Legal Issues'), '834e16b9-8b2d-4122-aecf-797f6d281120', 'Legal precedents found, need to discuss implications.');

INSERT INTO comments (task_id, user_id, content) VALUES ((SELECT id FROM tasks WHERE title = 'Prepare for Trial'), 'b44f1307-e310-4326-972b-8dc543bcbcf7', 'Trial preparation in progress, evidence organized.');




INSERT INTO comments (task_id, user_id, content) VALUES ((SELECT id FROM tasks WHERE title = 'Negotiate Settlement Terms'), 'bfc92523-e055-49e6-979b-06830b0fe754', 'Negotiations ongoing, close to an agreement.');
INSERT INTO comments (task_id, user_id, content) VALUES ((SELECT id FROM tasks WHERE title = 'File Legal Motions'), 'f9880ccb-9fbc-4a7c-82c3-4e236bf1151f', 'Legal motions filed, awaiting court response.');
INSERT INTO comments (task_id, user_id, content) VALUES ((SELECT id FROM tasks WHERE title = 'Review Client Documents'), '072203a2-89e7-482c-8c0f-cc1694f3eb49', 'Client documents reviewed, key information highlighted.');
INSERT INTO comments (task_id, user_id, content) VALUES ((SELECT id FROM tasks WHERE title = 'Prepare Cross-Examination Questions'), '072203a2-89e7-482c-8c0f-cc1694f3eb49', 'Cross-examination questions drafted, ready for review.');
INSERT INTO comments (task_id, user_id, content) VALUES ((SELECT id FROM tasks WHERE title = 'Analyze Evidence'), '08496e5f-e6c3-4859-b38f-17bbee45f3c4', 'Evidence analysis completed, potential weaknesses identified.');
INSERT INTO comments (task_id, user_id, content) VALUES ((SELECT id FROM tasks WHERE title = 'Review Contract Amendments'), '14db61ee-dca1-486b-8718-4f685613c06b', 'Contract amendments reviewed, need client approval.');
INSERT INTO comments (task_id, user_id, content) VALUES ((SELECT id FROM tasks WHERE title = 'Prepare for Arbitration'), '2c8c456a-fa57-41cd-bc64-398d52265909', 'Arbitration preparation in progress, documents ready.');
INSERT INTO comments (task_id, user_id, content) VALUES ((SELECT id FROM tasks WHERE title = 'Finalize Discovery Responses'), '072203a2-89e7-482c-8c0f-cc1694f3eb49', 'Discovery responses finalized and sent.');
INSERT INTO comments (task_id, user_id, content) VALUES ((SELECT id FROM tasks WHERE title = 'Research Jurisdiction Laws'), '834e16b9-8b2d-4122-aecf-797f6d281120', 'Jurisdiction laws researched, need to discuss implications.');
INSERT INTO comments (task_id, user_id, content) VALUES ((SELECT id FROM tasks WHERE title = 'Prepare Closing Arguments'), 'b44f1307-e310-4326-972b-8dc543bcbcf7', 'Closing arguments drafted, ready for review.');
INSERT INTO comments (task_id, user_id, content) VALUES ((SELECT id FROM tasks WHERE title = 'Negotiate Final Terms'), 'bfc92523-e055-49e6-979b-06830b0fe754', 'Final terms negotiation in progress, close to agreement.');
INSERT INTO comments (task_id, user_id, content) VALUES ((SELECT id FROM tasks WHERE title = 'File Appeal Documents'), 'f9880ccb-9fbc-4a7c-82c3-4e236bf1151f', 'Appeal documents filed, confirmation received.');



UPDATE tasks
SET priority = 'High', status = 'In Progress', updated_at = CURRENT_TIMESTAMP, updated_by = '8b26d04b-5dec-4a31-a12b-cd4d206392bd'
WHERE title = 'Prepare Case File for Smith vs. Jones';
UPDATE tasks
SET assigned_to = '14db61ee-dca1-486b-8718-4f685613c06b', due_date = '2024-04-15', updated_at = CURRENT_TIMESTAMP, updated_by = '8b26d04b-5dec-4a31-a12b-cd4d206392bd'
WHERE title = 'Draft Motion to Dismiss';
UPDATE tasks
SET description = 'Review and annotate the contract with client changes.', status = 'In Progress', updated_at = CURRENT_TIMESTAMP, updated_by = '8b26d04b-5dec-4a31-a12b-cd4d206392bd'
WHERE title = 'Review Contract with Client';
UPDATE tasks
SET priority = 'High', color_code = '#ef4444', updated_at = CURRENT_TIMESTAMP, updated_by = '8b26d04b-5dec-4a31-a12b-cd4d206392bd'
WHERE title = 'Prepare for Mediation';
UPDATE tasks
SET status = 'Blocked', description = 'Waiting for client feedback to complete the brief.', updated_at = CURRENT_TIMESTAMP, updated_by = '8b26d04b-5dec-4a31-a12b-cd4d206392bd'
WHERE title = 'Finalize Legal Brief';
UPDATE tasks
SET assigned_to = '2c8c456a-fa57-41cd-bc64-398d52265909', updated_at = CURRENT_TIMESTAMP, updated_by = '8b26d04b-5dec-4a31-a12b-cd4d206392bd'
WHERE title = 'Review Opposing Counsel Filings';
UPDATE tasks
SET due_date = '2024-03-28', updated_at = CURRENT_TIMESTAMP, updated_by = '8b26d04b-5dec-4a31-a12b-cd4d206392bd'
WHERE title = 'Prepare Witness Interviews';
UPDATE tasks
SET status = 'Todo', priority = 'Medium', updated_at = CURRENT_TIMESTAMP, updated_by = '8b26d04b-5dec-4a31-a12b-cd4d206392bd'
WHERE title = 'Draft Settlement Proposal';
UPDATE tasks
SET description = 'Finalize presentation slides with updated financial projections.', updated_at = CURRENT_TIMESTAMP, updated_by = '8b26d04b-5dec-4a31-a12b-cd4d206392bd'
WHERE title = 'Prepare Client Presentation';
UPDATE tasks
SET status = 'Done', updated_at = CURRENT_TIMESTAMP, updated_by = '8b26d04b-5dec-4a31-a12b-cd4d206392bd'
WHERE title = 'Negotiate with Opposing Counsel';
UPDATE tasks
SET due_date = '2024-03-07', assigned_to = '834e16b9-8b2d-4122-aecf-797f6d281120', updated_at = CURRENT_TIMESTAMP, updated_by = '8b26d04b-5dec-4a31-a12b-cd4d206392bd'
WHERE title = 'File Court Documents';
UPDATE tasks
SET status = 'Blocked', updated_at = CURRENT_TIMESTAMP, updated_by = '8b26d04b-5dec-4a31-a12b-cd4d206392bd'
WHERE title = 'Review Client Correspondence';
UPDATE tasks
SET assigned_to = 'bfc92523-e055-49e6-979b-06830b0fe754', description = 'Coordinate with expert to finalize the testimony details.', updated_at = CURRENT_TIMESTAMP, updated_by = '8b26d04b-5dec-4a31-a12b-cd4d206392bd'
WHERE title = 'Prepare Expert Witness Testimony';
UPDATE tasks
SET priority = 'High', due_date = '2024-04-05', updated_at = CURRENT_TIMESTAMP, updated_by = '8b26d04b-5dec-4a31-a12b-cd4d206392bd'
WHERE title = 'Analyze Financial Documents';
UPDATE tasks
SET status = 'In Progress', updated_at = CURRENT_TIMESTAMP, updated_by = '8b26d04b-5dec-4a31-a12b-cd4d206392bd'
WHERE title = 'Draft Discovery Requests';
UPDATE tasks
SET color_code = '#6366f1', updated_at = CURRENT_TIMESTAMP, updated_by = '8b26d04b-5dec-4a31-a12b-cd4d206392bd'
WHERE title = 'Prepare for Deposition';
UPDATE tasks
SET status = 'Done', updated_at = CURRENT_TIMESTAMP, updated_by = '8b26d04b-5dec-4a31-a12b-cd4d206392bd'
WHERE title = 'Finalize Settlement Agreement';
UPDATE tasks
SET description = 'Detailed research on legal precedents related to this case.', updated_at = CURRENT_TIMESTAMP, updated_by = '8b26d04b-5dec-4a31-a12b-cd4d206392bd'
WHERE title = 'Research Legal Issues';
UPDATE tasks
SET assigned_to = 'f9880ccb-9fbc-4a7c-82c3-4e236bf1151f', priority = 'Medium', updated_at = CURRENT_TIMESTAMP, updated_by = '8b26d04b-5dec-4a31-a12b-cd4d206392bd'
WHERE title = 'Prepare for Trial';
UPDATE tasks
SET status = 'Done', updated_at = CURRENT_TIMESTAMP, updated_by = '8b26d04b-5dec-4a31-a12b-cd4d206392bd'
WHERE title = 'Negotiate Settlement Terms';
UPDATE tasks
SET color_code = '#f97316', due_date = '2024-03-06', updated_at = CURRENT_TIMESTAMP, updated_by = '8b26d04b-5dec-4a31-a12b-cd4d206392bd'
WHERE title = 'File Legal Motions';
UPDATE tasks
SET assigned_to = '14db61ee-dca1-486b-8718-4f685613c06b', updated_at = CURRENT_TIMESTAMP, updated_by = '8b26d04b-5dec-4a31-a12b-cd4d206392bd'
WHERE title = 'Review Client Documents';
UPDATE tasks
SET priority = 'Medium', updated_at = CURRENT_TIMESTAMP, updated_by = '8b26d04b-5dec-4a31-a12b-cd4d206392bd'
WHERE title = 'Prepare Cross-Examination Questions';
UPDATE tasks
SET status = 'Blocked', updated_at = CURRENT_TIMESTAMP, updated_by = '8b26d04b-5dec-4a31-a12b-cd4d206392bd'
WHERE title = 'Analyze Evidence';
UPDATE tasks
SET assigned_to = '072203a2-89e7-482c-8c0f-cc1694f3eb49', description='Finalize the contract amendments with client input', updated_at = CURRENT_TIMESTAMP, updated_by = '8b26d04b-5dec-4a31-a12b-cd4d206392bd'
WHERE title = 'Review Contract Amendments';
UPDATE tasks
SET status = 'Done', assigned_to = '2c8c456a-fa57-41cd-bc64-398d52265909', updated_at = CURRENT_TIMESTAMP, updated_by = '8b26d04b-5dec-4a31-a12b-cd4d206392bd'
WHERE title = 'Prepare for Arbitration';
UPDATE tasks
SET description = 'Final discovery responses are ready for submission', updated_at = CURRENT_TIMESTAMP, updated_by = '8b26d04b-5dec-4a31-a12b-cd4d206392bd'
WHERE title = 'Finalize Discovery Responses';
UPDATE tasks
SET priority = 'High', updated_at = CURRENT_TIMESTAMP, updated_by = '8b26d04b-5dec-4a31-a12b-cd4d206392bd'
WHERE title = 'Research Jurisdiction Laws';
UPDATE tasks
SET status = 'In Progress', updated_at = CURRENT_TIMESTAMP, updated_by = '8b26d04b-5dec-4a31-a12b-cd4d206392bd'
WHERE title = 'Prepare Closing Arguments';
UPDATE tasks
SET due_date = '2024-04-10', updated_at = CURRENT_TIMESTAMP, updated_by = '8b26d04b-5dec-4a31-a12b-cd4d206392bd'
WHERE title = 'Negotiate Final Terms';

UPDATE tasks
SET status = 'Blocked', priority = 'Low', updated_at = CURRENT_TIMESTAMP, updated_by = '8b26d04b-5dec-4a31-a12b-cd4d206392bd'
WHERE title = 'File Appeal Documents';
UPDATE tasks
SET due_date = '2024-04-18', assigned_to = '834e16b9-8b2d-4122-aecf-797f6d281120', updated_at = CURRENT_TIMESTAMP, updated_by = '8b26d04b-5dec-4a31-a12b-cd4d206392bd'
WHERE title = 'Review Client Documents';
UPDATE tasks
SET description = 'Prepare detailed questions for cross-examination based on witness statements.', updated_at = CURRENT_TIMESTAMP, updated_by = '8b26d04b-5dec-4a31-a12b-cd4d206392bd'
WHERE title = 'Prepare Cross-Examination Questions';
UPDATE tasks
SET color_code = '#10b981', updated_at = CURRENT_TIMESTAMP, updated_by = '8b26d04b-5dec-4a31-a12b-cd4d206392bd'
WHERE title = 'Analyze Evidence';
UPDATE tasks
SET status = 'Done', updated_at = CURRENT_TIMESTAMP, updated_by = '8b26d04b-5dec-4a31-a12b-cd4d206392bd'
WHERE title = 'Review Contract Amendments';
UPDATE tasks
SET assigned_to = '08496e5f-e6c3-4859-b38f-17bbee45f3c4', updated_at = CURRENT_TIMESTAMP, updated_by = '8b26d04b-5dec-4a31-a12b-cd4d206392bd'
WHERE title = 'Prepare for Arbitration';
UPDATE tasks
SET priority = 'High', updated_at = CURRENT_TIMESTAMP, updated_by = '8b26d04b-5dec-4a31-a12b-cd4d206392bd'
WHERE title = 'Finalize Discovery Responses';
UPDATE tasks
SET status = 'In Progress', due_date = '2024-04-22', updated_at = CURRENT_TIMESTAMP, updated_by = '8b26d04b-5dec-4a31-a12b-cd4d206392bd'
WHERE title = 'Research Jurisdiction Laws';
UPDATE tasks
SET description = 'Finalize closing arguments with key points and evidence.', color_code = '#f59e0b', updated_at = CURRENT_TIMESTAMP, updated_by = '8b26d04b-5dec-4a31-a12b-cd4d206392bd'
WHERE title = 'Prepare Closing Arguments';
UPDATE tasks
SET assigned_to = 'f9880ccb-9fbc-4a7c-82c3-4e236bf1151f', status = 'Done', updated_at = CURRENT_TIMESTAMP, updated_by = '8b26d04b-5dec-4a31-a12b-cd4d206392bd'
WHERE title = 'Negotiate Final Terms';
UPDATE tasks
SET priority = 'Medium', description = 'File the appeal documents with the appellate court.', updated_at = CURRENT_TIMESTAMP, updated_by = '8b26d04b-5dec-4a31-a12b-cd4d206392bd'
WHERE title = 'File Appeal Documents';
UPDATE tasks
SET status = 'In Progress', assigned_to = '2c8c456a-fa57-41cd-bc64-398d52265909', updated_at = CURRENT_TIMESTAMP, updated_by = '8b26d04b-5dec-4a31-a12b-cd4d206392bd'
WHERE title = 'Review Client Documents';
UPDATE tasks
SET due_date = '2024-03-29', updated_at = CURRENT_TIMESTAMP, updated_by = '8b26d04b-5dec-4a31-a12b-cd4d206392bd'
WHERE title = 'Prepare Cross-Examination Questions';
UPDATE tasks
SET color_code = '#a855f7', status = 'In Progress', updated_at = CURRENT_TIMESTAMP, updated_by = '8b26d04b-5dec-4a31-a12b-cd4d206392bd'
WHERE title = 'Analyze Evidence';
UPDATE tasks
SET assigned_to = '072203a2-89e7-482c-8c0f-cc1694f3eb49', priority = 'High', updated_at = CURRENT_TIMESTAMP, updated_by = '8b26d04b-5dec-4a31-a12b-cd4d206392bd'
WHERE title = 'Review Contract Amendments';
UPDATE tasks
SET description = 'Prepare for the arbitration hearing with all necessary documents.', updated_at = CURRENT_TIMESTAMP, updated_by = '8b26d04b-5dec-4a31-a12b-cd4d206392bd'
WHERE title = 'Prepare for Arbitration';
UPDATE tasks
SET status = 'Blocked', color_code = '#ef4444', updated_at = CURRENT_TIMESTAMP, updated_by = '8b26d04b-5dec-4a31-a12b-cd4d206392bd'
WHERE title = 'Finalize Discovery Responses';
UPDATE tasks
SET due_date = '2024-04-25', assigned_to = 'b44f1307-e310-4326-972b-8dc543bcbcf7', updated_at = CURRENT_TIMESTAMP, updated_by = '8b26d04b-5dec-4a31-a12b-cd4d206392bd'
WHERE title = 'Research Jurisdiction Laws';
UPDATE tasks
SET priority = 'Low', updated_at = CURRENT_TIMESTAMP, updated_by = '8b26d04b-5dec-4a31-a12b-cd4d206392bd'
WHERE title = 'Prepare Closing Arguments';
UPDATE tasks
SET status = 'Done', description = 'Final negotiations completed and terms agreed upon.', updated_at = CURRENT_TIMESTAMP, updated_by = '8b26d04b-5dec-4a31-a12b-cd4d206392bd'
WHERE title = 'Negotiate Final Terms';

UPDATE tasks
SET assigned_to = '14db61ee-dca1-486b-8718-4f685613c06b', due_date = '2024-04-20', updated_at = CURRENT_TIMESTAMP, updated_by = '8b26d04b-5dec-4a31-a12b-cd4d206392bd'
WHERE title = 'File Appeal Documents';
UPDATE tasks
SET status = 'Todo', priority = 'Medium', updated_at = CURRENT_TIMESTAMP, updated_by = '8b26d04b-5dec-4a31-a12b-cd4d206392bd'
WHERE title = 'Review Client Documents';
UPDATE tasks
SET color_code = '#3b82f6', updated_at = CURRENT_TIMESTAMP, updated_by = '8b26d04b-5dec-4a31-a12b-cd4d206392bd'
WHERE title = 'Prepare Cross-Examination Questions';
UPDATE tasks
SET description = 'Analyze all evidence and prepare a comprehensive report.', updated_at = CURRENT_TIMESTAMP, updated_by = '8b26d04b-5dec-4a31-a12b-cd4d206392bd'
WHERE title = 'Analyze Evidence';
UPDATE tasks
SET status = 'In Progress', assigned_to = '834e16b9-8b2d-4122-aecf-797f6d281120', updated_at = CURRENT_TIMESTAMP, updated_by = '8b26d04b-5dec-4a31-a12b-cd4d206392bd'
WHERE title = 'Review Contract Amendments';
UPDATE tasks
SET priority = 'High', due_date = '2024-04-28', updated_at = CURRENT_TIMESTAMP, updated_by = '8b26d04b-5dec-4a31-a12b-cd4d206392bd'
WHERE title = 'Prepare for Arbitration';
UPDATE tasks
SET color_code = '#f97316', status = 'In Progress', updated_at = CURRENT_TIMESTAMP, updated_by = '8b26d04b-5dec-4a31-a12b-cd4d206392bd'
WHERE title = 'Finalize Discovery Responses';
UPDATE tasks
SET description = 'Research all applicable jurisdictional laws for the case.', updated_at = CURRENT_TIMESTAMP, updated_by = '8b26d04b-5dec-4a31-a12b-cd4d206392bd'
WHERE title = 'Research Jurisdiction Laws';
UPDATE tasks
SET assigned_to = '08496e5f-e6c3-4859-b38f-17bbee45f3c4', updated_at = CURRENT_TIMESTAMP, updated_by = '8b26d04b-5dec-4a31-a12b-cd4d206392bd'
WHERE title = 'Prepare Closing Arguments';
UPDATE tasks
SET priority = 'High', updated_at = CURRENT_TIMESTAMP, updated_by = '8b26d04b-5dec-4a31-a12b-cd4d206392bd'
WHERE title = 'Negotiate Final Terms';
UPDATE tasks
SET status = 'Blocked', updated_at = CURRENT_TIMESTAMP, updated_by = '8b26d04b-5dec-4a31-a12b-cd4d206392bd'
WHERE title = 'File Appeal Documents';
UPDATE tasks
SET color_code = '#ec4899', due_date = '2024-04-23', updated_at = CURRENT_TIMESTAMP, updated_by = '8b26d04b-5dec-4a31-a12b-cd4d206392bd'
WHERE title = 'Review Client Documents';
UPDATE tasks
SET description = 'Finalize cross-examination questions and strategy.', updated_at = CURRENT_TIMESTAMP, updated_by = '8b26d04b-5dec-4a31-a12b-cd4d206392bd'
WHERE title = 'Prepare Cross-Examination Questions';
UPDATE tasks
SET assigned_to = '2c8c456a-fa57-41cd-bc64-398d52265909', updated_at = CURRENT_TIMESTAMP, updated_by = '8b26d04b-5dec-4a31-a12b-cd4d206392bd'
WHERE title = 'Analyze Evidence';
UPDATE tasks
SET priority = 'Low', status = 'Done', updated_at = CURRENT_TIMESTAMP, updated_by = '8b26d04b-5dec-4a31-a12b-cd4d206392bd'
WHERE title = 'Review Contract Amendments';
UPDATE tasks
SET due_date = '2024-04-30', updated_at = CURRENT_TIMESTAMP, updated_by = '8b26d04b-5dec-4a31-a12b-cd4d206392bd'
WHERE title = 'Prepare for Arbitration';
UPDATE tasks
SET color_code = '#6366f1', updated_at = CURRENT_TIMESTAMP, updated_by = '8b26d04b-5dec-4a31-a12b-cd4d206392bd'
WHERE title = 'Finalize Discovery Responses';
UPDATE tasks
SET assigned_to = 'b44f1307-e310-4326-972b-8dc543bcbcf7', description = 'Complete research on jurisdictional law and prepare a summary.', updated_at = CURRENT_TIMESTAMP, updated_by = '8b26d04b-5dec-4a31-a12b-cd4d206392bd'
WHERE title = 'Research Jurisdiction Laws';
UPDATE tasks
SET status = 'Done', priority = 'Medium', updated_at = CURRENT_TIMESTAMP, updated_by = '8b26d04b-5dec-4a31-a12b-cd4d206392bd'
WHERE title = 'Prepare Closing Arguments';
UPDATE tasks
SET status = 'In Progress', updated_at = CURRENT_TIMESTAMP, updated_by = '8b26d04b-5dec-4a31-a12b-cd4d206392bd'
WHERE title = 'Negotiate Final Terms';
UPDATE tasks
SET description = 'File the revised appeal documents with the court.', updated_at = CURRENT_TIMESTAMP, updated_by = '8b26d04b-5dec-4a31-a12b-cd4d206392bd'
WHERE title = 'File Appeal Documents';
UPDATE tasks
SET assigned_to = '072203a2-89e7-482c-8c0f-cc1694f3eb49', color_code = '#10b981', updated_at = CURRENT_TIMESTAMP, updated_by = '8b26d04b-5dec-4a31-a12b-cd4d206392bd'
WHERE title = 'Review Client Documents';
UPDATE tasks
SET due_date = '2024-04-26', updated_at = CURRENT_TIMESTAMP, updated_by = '8b26d04b-5dec-4a31-a12b-cd4d206392bd'
WHERE title = 'Prepare Cross-Examination Questions';
UPDATE tasks
SET status = 'Blocked', updated_at = CURRENT_TIMESTAMP, updated_by = '8b26d04b-5dec-4a31-a12b-cd4d206392bd'
WHERE title = 'Analyze Evidence';
UPDATE tasks
SET priority = 'High', assigned_to = 'f9880ccb-9fbc-4a7c-82c3-4e236bf1151f', updated_at = CURRENT_TIMESTAMP, updated_by = '8b26d04b-5dec-4a31-a12b-cd4d206392bd'
UPDATE tasks
SET description = 'Prepare all necessary documents and exhibits for arbitration.', updated_at = CURRENT_TIMESTAMP, updated_by = '8b26d04b-5dec-4a31-a12b-cd4d206392bd'
WHERE title = 'Prepare for Arbitration';
UPDATE tasks
SET status = 'Done', due_date = '2024-04-29', updated_at = CURRENT_TIMESTAMP, updated_by = '8b26d04b-5dec-4a31-a12b-cd4d206392bd'
WHERE title = 'Finalize Discovery Responses';
UPDATE tasks
SET color_code = '#d3d3d3', updated_at = CURRENT_TIMESTAMP, updated_by = '8b26d04b-5dec-4a31-a12b-cd4d206392bd'
WHERE title = 'Research Jurisdiction Laws';
UPDATE tasks
SET assigned_to = '14db61ee-dca1-486b-8718-4f685613c06b', priority = 'Low', updated_at = CURRENT_TIMESTAMP, updated_by = '8b26d04b-5dec-4a31-a12b-cd4d206392bd'
WHERE title = 'Prepare Closing Arguments';
UPDATE tasks
SET description = 'Final negotiations complete, waiting for final agreement.', status = 'Todo', updated_at = CURRENT_TIMESTAMP, changed_by = '8b26d04b-5dec-4a31-a12b-cd4d206392bd'
WHERE title = 'Negotiate Final Terms';





INSERT INTO tasks (project_id, title, description, status, priority, color_code, due_date, created_by, assigned_to)
VALUES ('9a7b1c2d-3e4f-5064-7283-94a5b6c7d8e9', 'Prepare Summary Judgment Motion', 'Draft and file the summary judgment motion.', 'Todo', 'High', '#ef4444', '2024-05-05', '8b26d04b-5dec-4a31-a12b-cd4d206392bd', '08496e5f-e6c3-4859-b38f-17bbee45f3c4');

INSERT INTO tasks (project_id, title, description, status, priority, color_code, due_date, created_by, assigned_to)
VALUES ('9a7b1c2d-3e4f-5064-7283-94a5b6c7d8e9', 'Review Real Estate Documents', 'Analyze property deeds and agreements.', 'In Progress', 'Medium', '#f97316', '2024-05-10', '072203a2-89e7-482c-8c0f-cc1694f3eb49', '08496e5f-e6c3-4859-b38f-17bbee45f3c4');

INSERT INTO tasks (project_id, title, description, status, priority, color_code, due_date, created_by, assigned_to)
VALUES ('9a7b1c2d-3e4f-5064-7283-94a5b6c7d8e9', 'Draft Lease Agreement', 'Prepare the lease agreement for client review.', 'Backlog', 'Low', '#d3d3d3', '2024-05-15', '8b26d04b-5dec-4a31-a12b-cd4d206392bd', '14db61ee-dca1-486b-8718-4f685613c06b');

INSERT INTO tasks (project_id, title, description, status, priority, color_code, due_date, created_by, assigned_to)
VALUES ('9a7b1c2d-3e4f-5064-7283-94a5b6c7d8e9', 'Prepare for Closing', 'Organize all closing documents and requirements.', 'In Progress', 'Medium', '#f59e0b', '2024-05-20', '08496e5f-e6c3-4859-b38f-17bbee45f3c4', '2c8c456a-fa57-41cd-bc64-398d52265909');

INSERT INTO tasks (project_id, title, description, status, priority, color_code, due_date, created_by, assigned_to)
VALUES ('9a7b1c2d-3e4f-5064-7283-94a5b6c7d8e9', 'Finalize Property Transfer', 'Complete all final steps for property transfer.', 'Done', 'High', '#10b981', '2024-05-25', '8b26d04b-5dec-4a31-a12b-cd4d206392bd', '072203a2-89e7-482c-8c0f-cc1694f3eb49');

INSERT INTO tasks (project_id, title, description, status, priority, color_code, due_date, created_by, assigned_to)
VALUES ('9a7b1c2d-3e4f-5064-7283-94a5b6c7d8e9', 'Research Zoning Laws', 'Investigate relevant zoning regulations.', 'Todo', 'Medium', '#3b82f6', '2024-05-30', '072203a2-89e7-482c-8c0f-cc1694f3eb49', '834e16b9-8b2d-4122-aecf-797f6d281120');

INSERT INTO tasks (project_id, title, description, status, priority, color_code, due_date, created_by, assigned_to)
VALUES ('9a7b1c2d-3e4f-5064-7283-94a5b6c7d8e9', 'Prepare Environmental Impact Report', 'Compile and review environmental impact data.', 'In Progress', 'High', '#6366f1', '2024-06-05', '08496e5f-e6c3-4859-b38f-17bbee45f3c4', 'b44f1307-e310-4326-972b-8dc543bcbcf7');

INSERT INTO tasks (project_id, title, description, status, priority, color_code, due_date, created_by, assigned_to)
VALUES ('9a7b1c2d-3e4f-5064-7283-94a5b6c7d8e9', 'Negotiate Property Acquisition', 'Discuss terms of property acquisition with seller.', 'In Progress', 'Medium', '#a855f7', '2024-06-10', '8b26d04b-5dec-4a31-a12b-cd4d206392bd', 'bfc92523-e055-49e6-979b-06830b0fe754');

INSERT INTO tasks (project_id, title, description, status, priority, color_code, due_date, created_by, assigned_to)
VALUES ('9a7b1c2d-3e4f-5064-7283-94a5b6c7d8e9', 'File Permit Applications', 'Submit all necessary permit applications.', 'Done', 'High', '#ec4899', '2024-06-15', '072203a2-89e7-482c-8c0f-cc1694f3eb49', 'f9880ccb-9fbc-4a7c-82c3-4e236bf1151f');

INSERT INTO tasks (project_id, title, description, status, priority, color_code, due_date, created_by, assigned_to)
VALUES ('9a7b1c2d-3e4f-5064-7283-94a5b6c7d8e9', 'Review Title Report', 'Analyze the title report for any issues.', 'Todo', 'Low', '#d3d3d3', '2024-06-20', '8b26d04b-5dec-4a31-a12b-cd4d206392bd', '072203a2-89e7-482c-8c0f-cc1694f3eb49');

INSERT INTO tasks (project_id, title, description, status, priority, color_code, due_date, created_by, assigned_to)
VALUES ('9a7b1c2d-3e4f-5064-7283-94a5b6c7d8e9', 'Prepare Closing Statement', 'Draft the final closing statement for client review.', 'In Progress', 'High', '#ef4444', '2024-06-25', '08496e5f-e6c3-4859-b38f-17bbee45f3c4', '072203a2-89e7-482c-8c0f-cc1694f3eb49');

INSERT INTO tasks (project_id, title, description, status, priority, color_code, due_date, created_by, assigned_to)
VALUES ('9a7b1c2d-3e4f-5064-7283-94a5b6c7d8e9', 'Conduct Due Diligence', 'Perform thorough due diligence on the property.', 'Todo', 'Medium', '#f97316', '2024-06-30', '072203a2-89e7-482c-8c0f-cc1694f3eb49', '08496e5f-e6c3-4859-b38f-17bbee45f3c4');

INSERT INTO tasks (project_id, title, description, status, priority, color_code, due_date, created_by, assigned_to)
VALUES ('9a7b1c2d-3e4f-5064-7283-94a5b6c7d8e9', 'Draft Purchase Agreement', 'Prepare the purchase agreement for the property.', 'Backlog', 'Low', '#d3d3d3', '2024-07-05', '8b26d04b-5dec-4a31-a12b-cd4d206392bd', '14db61ee-dca1-486b-8718-4f685613c06b');

INSERT INTO tasks (project_id, title, description, status, priority, color_code, due_date, created_by, assigned_to)
VALUES ('9a7b1c2d-3e4f-5064-7283-94a5b6c7d8e9', 'Secure Financing', 'Obtain necessary financing for the property purchase.', 'In Progress', 'Medium', '#f59e0b', '2024-07-10', '08496e5f-e6c3-4859-b38f-17bbee45f3c4', '2c8c456a-fa57-41cd-bc64-398d52265909');

INSERT INTO tasks (project_id, title, description, status, priority, color_code, due_date, created_by, assigned_to)
VALUES ('9a7b1c2d-3e4f-5064-7283-94a5b6c7d8e9', 'Complete Property Inspection', 'Conduct a thorough inspection of the property.', 'Done', 'High', '#10b981', '2024-07-15', '8b26d04b-5dec-4a31-a12b-cd4d206392bd', '072203a2-89e7-482c-8c0f-cc1694f3eb49');

INSERT INTO tasks (project_id, title, description, status, priority, color_code, due_date, created_by, assigned_to)
VALUES ('9a7b1c2d-3e4f-5064-7283-94a5b6c7d8e9', 'Review Survey Results', 'Analyze the survey results of the property.', 'Todo', 'Medium', '#3b82f6', '2024-07-20', '072203a2-89e7-482c-8c0f-cc1694f3eb49', '834e16b9-8b2d-4122-aecf-797f6d281120');

INSERT INTO tasks (project_id, title, description, status, priority, color_code, due_date, created_by, assigned_to)
VALUES ('9a7b1c2d-3e4f-5064-7283-94a5b6c7d8e9', 'Prepare Closing Documents', 'Organize all necessary closing documents.', 'In Progress', 'High', '#6366f1', '2024-07-25', '08496e5f-e6c3-4859-b38f-17bbee45f3c4', 'b44f1307-e310-4326-972b-8dc543bcbcf7');

INSERT INTO tasks (project_id, title, description, status, priority, color_code, due_date, created_by, assigned_to)
VALUES ('9a7b1c2d-3e4f-5064-7283-94a5b6c7d8e9', 'Finalize Closing', 'Complete the final closing of the property transaction.', 'In Progress', 'Medium', '#a855f7', '2024-07-30', '8b26d04b-5dec-4a31-a12b-cd4d206392bd', 'bfc92523-e055-49e6-979b-06830b0fe754');

INSERT INTO tasks (project_id, title, description, status, priority, color_code, due_date, created_by, assigned_to)
VALUES ('9a7b1c2d-3e4f-5064-7283-94a5b6c7d8e9', 'Review Post-Closing Documents', 'Analyze all post-closing documents for accuracy.', 'Done', 'High', '#ec4899', '2024-08-05', '072203a2-89e7-482c-8c0f-cc1694f3eb49', 'f9880ccb-9fbc-4a7c-82c3-4e236bf1151f');

INSERT INTO tasks (project_id, title, description, status, priority, color_code, due_date, created_by, assigned_to)
VALUES ('9a7b1c2d-3e4f-5064-7283-94a5b6c7d8e9', 'Prepare Final Report', 'Compile a final report of the property transaction.', 'Todo', 'Low', '#d3d3d3', '2024-08-10', '8b26d04b-5dec-4a31-a12b-cd4d206392bd', '072203a2-89e7-482c-8c0f-cc1694f3eb49');


INSERT INTO tasks (project_id, title, description, status, priority, color_code, due_date, created_by, assigned_to)
VALUES ('9a7b1c2d-3e4f-5064-7283-94a5b6c7d8e9', 'Draft Commercial Lease Agreement', 'Prepare the commercial lease agreement for tenant.', 'Todo', 'High', '#ef4444', '2024-08-15', '8b26d04b-5dec-4a31-a12b-cd4d206392bd', '08496e5f-e6c3-4859-b38f-17bbee45f3c4');

INSERT INTO tasks (project_id, title, description, status, priority, color_code, due_date, created_by, assigned_to)
VALUES ('9a7b1c2d-3e4f-5064-7283-94a5b6c7d8e9', 'Review Tenant Credit Report', 'Analyze tenant creditworthiness for lease agreement.', 'In Progress', 'Medium', '#f97316', '2024-08-20', '072203a2-89e7-482c-8c0f-cc1694f3eb49', '08496e5f-e6c3-4859-b38f-17bbee45f3c4');

INSERT INTO tasks (project_id, title, description, status, priority, color_code, due_date, created_by, assigned_to)
VALUES ('9a7b1c2d-3e4f-5064-7283-94a5b6c7d8e9', 'Negotiate Lease Terms', 'Discuss and agree on lease terms with the tenant.', 'Backlog', 'Low', '#d3d3d3', '2024-08-25', '8b26d04b-5dec-4a31-a12b-cd4d206392bd', '14db61ee-dca1-486b-8718-4f685613c06b');

INSERT INTO tasks (project_id, title, description, status, priority, color_code, due_date, created_by, assigned_to)
VALUES ('9a7b1c2d-3e4f-5064-7283-94a5b6c7d8e9', 'Prepare Lease Amendments', 'Draft any necessary amendments to the lease agreement.', 'In Progress', 'Medium', '#f59e0b', '2024-08-30', '08496e5f-e6c3-4859-b38f-17bbee45f3c4', '2c8c456a-fa57-41cd-bc64-398d52265909');

INSERT INTO tasks (project_id, title, description, status, priority, color_code, due_date, created_by, assigned_to)
VALUES ('9a7b1c2d-3e4f-5064-7283-94a5b6c7d8e9', 'Finalize Lease Agreement', 'Obtain final signatures on the lease agreement.', 'Done', 'High', '#10b981', '2024-09-05', '8b26d04b-5dec-4a31-a12b-cd4d206392bd', '072203a2-89e7-482c-8c0f-cc1694f3eb49');

INSERT INTO tasks (project_id, title, description, status, priority, color_code, due_date, created_by, assigned_to)
VALUES ('9a7b1c2d-3e4f-5064-7283-94a5b6c7d8e9', 'Review Property Insurance', 'Analyze the property insurance coverage.', 'Todo', 'Medium', '#3b82f6', '2024-09-10', '072203a2-89e7-482c-8c0f-cc1694f3eb49', '834e16b9-8b2d-4122-aecf-797f6d281120');

INSERT INTO tasks (project_id, title, description, status, priority, color_code, due_date, created_by, assigned_to)
VALUES ('9a7b1c2d-3e4f-5064-7283-94a5b6c7d8e9', 'Prepare Property Maintenance Schedule', 'Create a maintenance schedule for the property.', 'In Progress', 'High', '#6366f1', '2024-09-15', '08496e5f-e6c3-4859-b38f-17bbee45f3c4', 'b44f1307-e310-4326-972b-8dc543bcbcf7');

INSERT INTO tasks (project_id, title, description, status, priority, color_code, due_date, created_by, assigned_to)
VALUES ('9a7b1c2d-3e4f-5064-7283-94a5b6c7d8e9', 'Negotiate Property Management Agreement', 'Discuss terms of property management with the agency.', 'In Progress', 'Medium', '#a855f7', '2024-09-20', '8b26d04b-5dec-4a31-a12b-cd4d206392bd', 'bfc92523-e055-49e6-979b-06830b0fe754');

INSERT INTO tasks (project_id, title, description, status, priority, color_code, due_date, created_by, assigned_to)
VALUES ('9a7b1c2d-3e4f-5064-7283-94a5b6c7d8e9', 'File Property Tax Documents', 'Submit all necessary property tax documentation.', 'Done', 'High', '#ec4899', '2024-09-25', '072203a2-89e7-482c-8c0f-cc1694f3eb49', 'f9880ccb-9fbc-4a7c-82c3-4e236bf1151f');

INSERT INTO tasks (project_id, title, description, status, priority, color_code, due_date, created_by, assigned_to)
VALUES ('9a7b1c2d-3e4f-5064-7283-94a5b6c7d8e9', 'Review HOA Documents', 'Analyze homeowners association documents.', 'Todo', 'Low', '#d3d3d3', '2024-09-30', '8b26d04b-5dec-4a31-a12b-cd4d206392bd', '072203a2-89e7-482c-8c0f-cc1694f3eb49');


INSERT INTO tasks (project_id, title, description, status, priority, color_code, due_date, created_by, assigned_to)
VALUES ('9a7b1c2d-3e4f-5064-7283-94a5b6c7d8e9', 'Prepare Eviction Notice', 'Draft an eviction notice for non-compliant tenants.', 'In Progress', 'High', '#ef4444', '2024-10-05', '08496e5f-e6c3-4859-b38f-17bbee45f3c4', '072203a2-89e7-482c-8c0f-cc1694f3eb49');


INSERT INTO tasks (project_id, title, description, status, priority, color_code, due_date, created_by, assigned_to)
VALUES ('9a7b1c2d-3e4f-5064-7283-94a5b6c7d8e9', 'Review Construction Contracts', 'Analyze the construction contracts for the property.', 'Todo', 'Medium', '#f97316', '2024-10-10', '072203a2-89e7-482c-8c0f-cc1694f3eb49', '08496e5f-e6c3-4859-b38f-17bbee45f3c4');

INSERT INTO tasks (project_id, title, description, status, priority, color_code, due_date, created_by, assigned_to)
VALUES ('9a7b1c2d-3e4f-5064-7283-94a5b6c7d8e9', 'Draft Construction Change Orders', 'Prepare change orders for construction modifications.', 'Backlog', 'Low', '#d3d3d3', '2024-10-15', '8b26d04b-5dec-4a31-a12b-cd4d206392bd', '14db61ee-dca1-486b-8718-4f685613c06b');

INSERT INTO tasks (project_id, title, description, status, priority, color_code, due_date, created_by, assigned_to)
VALUES ('9a7b1c2d-3e4f-5064-7283-94a5b6c7d8e9', 'Prepare Payment Applications', 'Compile payment applications for construction progress.', 'In Progress', 'Medium', '#f59e0b', '2024-10-20', '08496e5f-e6c3-4859-b38f-17bbee45f3c4', '2c8c456a-fa57-41cd-bc64-398d52265909');

INSERT INTO tasks (project_id, title, description, status, priority, color_code, due_date, created_by, assigned_to)
VALUES ('9a7b1c2d-3e4f-5064-7283-94a5b6c7d8e9', 'Finalize Construction Project', 'Complete all final steps of the construction project.', 'Done', 'High', '#10b981', '2024-10-25', '8b26d04b-5dec-4a31-a12b-cd4d206392bd', '072203a2-89e7-482c-8c0f-cc1694f3eb49');

INSERT INTO tasks (project_id, title, description, status, priority, color_code, due_date, created_by, assigned_to)
VALUES ('9a7b1c2d-3e4f-5064-7283-94a5b6c7d8e9', 'Review Warranty Documents', 'Analyze warranty documents for construction work.', 'Todo', 'Medium', '#3b82f6', '2024-10-30', '072203a2-89e7-482c-8c0f-cc1694f3eb49', '834e16b9-8b2d-4122-aecf-797f6d281120');

INSERT INTO tasks (project_id, title, description, status, priority, color_code, due_date, created_by, assigned_to)
VALUES ('9a7b1c2d-3e4f-5064-7283-94a5b6c7d8e9', 'Prepare Punch List', 'Create a punch list for outstanding construction items.', 'In Progress', 'High', '#6366f1', '2024-11-05', '08496e5f-e6c3-4859-b38f-17bbee45f3c4', 'b44f1307-e310-4326-972b-8dc543bcbcf7');

INSERT INTO tasks (project_id, title, description, status, priority, color_code, due_date, created_by, assigned_to)
VALUES ('9a7b1c2d-3e4f-5064-7283-94a5b6c7d8e9', 'Negotiate Contractor Disputes', 'Discuss and resolve disputes with construction contractors.', 'In Progress', 'Medium', '#a855f7', '2024-11-10', '8b26d04b-5dec-4a31-a12b-cd4d206392bd', 'bfc92523-e055-49e6-979b-06830b0fe754');

INSERT INTO tasks (project_id, title, description, status, priority, color_code, due_date, created_by, assigned_to)
VALUES ('9a7b1c2d-3e4f-5064-7283-94a5b6c7d8e9', 'File Lien Releases', 'Submit lien releases for completed construction work.', 'Done', 'High', '#ec4899', '2024-11-15', '072203a2-89e7-482c-8c0f-cc1694f3eb49', 'f9880ccb-9fbc-4a7c-82c3-4e236bf1151f');

INSERT INTO tasks (project_id, title, description, status, priority, color_code, due_date, created_by, assigned_to)
VALUES ('9a7b1c2d-3e4f-5064-7283-94a5b6c7d8e9', 'Review As-Built Drawings', 'Analyze as-built drawings for construction documentation.', 'Todo', 'Low', '#d3d3d3', '2024-11-20', '8b26d04b-5dec-4a31-a12b-cd4d206392bd', '072203a2-89e7-482c-8c0f-cc1694f3eb49');

INSERT INTO tasks (project_id, title, description, status, priority, color_code, due_date, created_by, assigned_to)
VALUES ('9a7b1c2d-3e4f-5064-7283-94a5b6c7d8e9', 'Prepare Final Construction Report', 'Compile a final report of the construction project.', 'In Progress', 'High', '#ef4444', '2024-11-25', '08496e5f-e6c3-4859-b38f-17bbee45f3c4', '072203a2-89e7-482c-8c0f-cc1694f3eb49');

INSERT INTO tasks (project_id, title, description, status, priority, color_code, due_date, created_by, assigned_to)
VALUES ('9a7b1c2d-3e4f-5064-7283-94a5b6c7d8e9', 'Draft Commercial Purchase Contract', 'Prepare the purchase agreement for a commercial property.', 'Todo', 'Medium', '#f97316', '2024-11-30', '072203a2-89e7-482c-8c0f-cc1694f3eb49', '072203a2-89e7-482c-8c0f-cc1694f3eb49');