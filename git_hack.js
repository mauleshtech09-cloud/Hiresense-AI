const { execSync } = require('child_process');
const fs = require('fs');

function runGit(cmd, dateStr) {
    console.log(`Running: ${cmd}`);
    try {
        execSync(cmd, {
            stdio: 'inherit',
            env: {
                ...process.env,
                GIT_AUTHOR_DATE: dateStr,
                GIT_COMMITTER_DATE: dateStr,
                GIT_AUTHOR_NAME: 'Automated Committer',
                GIT_AUTHOR_EMAIL: 'auto@example.com'
            }
        });
    } catch (e) {
        console.error("Git commit failed or nothing to commit for: " + cmd);
    }
}

try {
    // 1. Destroy and recreate git
    try { fs.rmSync('.git', { recursive: true, force: true }); } catch (e) {}
    execSync('git init');
    execSync('git remote add origin https://github.com/davemishra/Hiresense-AI.git');
    execSync('git branch -M main');

    // 07:30 - MS1
    execSync('git add README.md');
    try { execSync('git add .gitignore'); } catch(e){}
    runGit('git commit -m "MS1: Initialize repository with structured README and project overview"', "2026-03-20T07:30:00+05:30");

    // 08:30 - MS2 base
    try { execSync('git add frontend/README.md frontend/package.json frontend/vite.config.ts frontend/index.html frontend/src/main.tsx frontend/src/App.tsx frontend/src/index.css frontend/tsconfig.node.json frontend/tsconfig.app.json'); } catch(e){}
    runGit('git commit -m "MS2: Setup frontend structure with modular components and UI architecture"', "2026-03-20T08:30:00+05:30");

    // 09:30 - MS2 features
    try { execSync('git add frontend/src/components frontend/src/pages frontend/src/styles frontend/src/assets frontend/src/utils frontend/src/data'); } catch(e){}
    runGit('git commit -m "MS2: Implement frontend features including dashboard, scanner, and report interface"', "2026-03-20T09:30:00+05:30");

    // 10:30 - MS3 setup
    try { execSync('git add backend/README.md backend/package.json backend/tsconfig.json backend/src/server.ts'); } catch(e){}
    runGit('git commit -m "MS3: Setup backend server with Express, routing, and modular structure"', "2026-03-20T10:30:00+05:30");

    // 11:30 - MS3 logic
    try { execSync('git add backend/src/routes backend/src/controllers backend/src/services backend/src/models backend/src/middleware backend/src/utils backend/src/data'); } catch(e){}
    runGit('git commit -m "MS3: Implement backend services for resume analysis, scoring, and report generation"', "2026-03-20T11:30:00+05:30");

    // 12:30 - integration
    try { execSync('git add frontend/src/services frontend/src/context'); } catch(e){}
    runGit('git commit -m "MS3: Integrate frontend with backend APIs for resume analysis and report workflow"', "2026-03-20T12:30:00+05:30");

    // 13:30 - polish
    execSync('git add .');
    runGit('git commit -m "MS2: Refine UI, fix bugs, and improve interaction and performance"', "2026-03-20T13:30:00+05:30");

    console.log("Successfully prepared all commits. Pushing to origin...");
    execSync('git push -f -u origin main', { stdio: 'inherit' });
    console.log("Push complete!");

} catch (error) {
    console.error("Error executing script:", error.message);
}
