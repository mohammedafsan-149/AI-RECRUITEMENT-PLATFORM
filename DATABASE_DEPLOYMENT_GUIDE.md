# 🗄️ TalentAI: SQL Database Architecture & Cloud Deployment Guide
**Easwari Engineering College • Department of Computer Science & Engineering**  
**Project:** AI-Enabled Smart Recruitment & Talent Intelligence Platform

---

## 📌 Executive Summary

The **TalentAI** platform utilizes a relational SQL database structure adhering to **Third Normal Form (3NF)** standards. All information displayed and collected across the website—job requisitions, applicant profiles, AI semantic match scores, candidate skills, scheduled Google Meet interviews, and live interview scorecards—is mapped to SQL relational tables.

The database layer is built using **Sequelize ORM** with multi-dialect support:
- **Local Development / Offline Demo**: Zero-config embedded **SQLite** database (`backend/database/recruitment.sqlite`).
- **Cloud Production Deployment**: **PostgreSQL** (Supabase / Neon.tech / Render / Railway / AWS RDS) or **MySQL** (PlanetScale / AWS Aurora).

---

## 📊 Database Relational Schema (ER Architecture)

```mermaid
erDiagram
    JOBS ||--o{ CANDIDATES : "has applicants"
    CANDIDATES ||--o{ CANDIDATE_SKILLS : "possesses"
    CANDIDATES ||--o{ INTERVIEWS : "scheduled for"
    INTERVIEWS ||--o| INTERVIEW_SCORECARDS : "evaluated with"

    JOBS {
        string id PK
        string title
        string department
        string location
        string type
        string salary_range
        int min_experience_years
        string required_skills
        text description
        string status
        timestamp created_at
    }

    CANDIDATES {
        string id PK
        string job_id FK
        string name
        string email UK
        string phone
        string current_title
        int experience_years
        int ai_score
        string stage
        text extracted_skills_json
        text ai_rationale
        timestamp created_at
    }

    CANDIDATE_SKILLS {
        int id PK
        string candidate_id FK
        string skill_name
        string proficiency_level
        boolean is_matched_requirement
    }

    INTERVIEWS {
        string id PK
        string candidate_id FK
        string candidate_name
        string candidate_email
        string job_title
        string interviewer_name
        date scheduled_date
        string time_slot
        string interview_type
        string meet_link
        string status
        text meeting_notes
    }

    INTERVIEW_SCORECARDS {
        string id PK
        string interview_id FK
        string candidate_id FK
        string interviewer_name
        int technical_score
        int problem_solving_score
        int culture_fit_score
        string overall_recommendation
        text assessment_notes
        timestamp submitted_at
    }

    RECRUITMENT_METRICS {
        string id PK
        string metric_key UK
        string metric_label
        string metric_value
        string growth_indicator
    }
```

---

## 📁 SQL Files Included in Project

1. **[`backend/database/schema.sql`](file:///C:/Users/MOHAMMED%20AFSAN/.gemini/antigravity/scratch/ai-recruitment-platform/backend/database/schema.sql)**:
   Universal ANSI SQL DDL statements defining all 6 tables, primary keys, foreign keys with cascading deletes, checks, and performance indexes.
2. **[`backend/database/seed.sql`](file:///C:/Users/MOHAMMED%20AFSAN/.gemini/antigravity/scratch/ai-recruitment-platform/backend/database/seed.sql)**:
   Pre-populated DML `INSERT` queries containing all candidate profiles, active job openings, confirmed interview meetings, and pipeline metrics.
3. **[`backend/database/recruitment.sqlite`](file:///C:/Users/MOHAMMED%20AFSAN/.gemini/antigravity/scratch/ai-recruitment-platform/backend/database/recruitment.sqlite)**:
   Ready-to-use binary SQLite database file populated with all records.

---

## 🚀 How to Run Locally (Zero Database Installation Required)

The backend comes pre-configured with SQLite, meaning **no separate MySQL or PostgreSQL server is needed to test or demonstrate the project locally**:

1. Navigate to the backend directory:
   ```powershell
   cd "C:\Users\MOHAMMED AFSAN\.gemini\antigravity\scratch\ai-recruitment-platform\backend"
   ```
2. Reset or re-seed the SQL database anytime:
   ```powershell
   npm run db:init
   ```
3. Start the backend API:
   ```powershell
   npm run dev
   ```
   The server connects to `recruitment.sqlite` and exposes full SQL CRUD routes at `http://localhost:5000/api/sql/...`.

---

## ☁️ Step-by-Step Cloud Deployment Options (100% Free)

### Option 1: Supabase (PostgreSQL - Recommended)
1. Go to [https://supabase.com](https://supabase.com) and create a free account.
2. Click **"New Project"**, name it `talentai-db`, and choose a secure database password.
3. In the left navigation, click **"SQL Editor"**.
4. Open [`backend/database/schema.sql`](file:///C:/Users/MOHAMMED%20AFSAN/.gemini/antigravity/scratch/ai-recruitment-platform/backend/database/schema.sql), copy all content, paste it into the Supabase SQL editor, and click **Run**.
5. Open [`backend/database/seed.sql`](file:///C:/Users/MOHAMMED%20AFSAN/.gemini/antigravity/scratch/ai-recruitment-platform/backend/database/seed.sql), copy all content, paste it into the editor, and click **Run**.
6. Go to **Project Settings &rarr; Database &rarr; Connection String &rarr; URI**.
7. Copy the connection URI (e.g. `postgresql://postgres:[YOUR-PASSWORD]@db.[PROJECT-REF].supabase.co:5432/postgres`).
8. Paste it into your `backend/.env` file:
   ```env
   DATABASE_URL=postgresql://postgres:YOUR_PASSWORD@db.YOUR_PROJECT.supabase.co:5432/postgres
   DB_SSL=true
   ```

---

### Option 2: Neon.tech (Serverless PostgreSQL - Instant Setup)
1. Visit [https://neon.tech](https://neon.tech) and sign up with GitHub or Google.
2. Create a new project named `talentai`.
3. Neon immediately generates a connection string:
   ```env
   DATABASE_URL=postgresql://neondb_owner:YOUR_KEY@ep-cool-sample.us-east-2.aws.neon.tech/neondb?sslmode=require
   ```
4. Paste this `DATABASE_URL` into `backend/.env`.
5. Run the automated seeder:
   ```powershell
   npm run db:init
   ```
   Sequelize will automatically connect to Neon, construct all tables, and seed all candidate data into cloud PostgreSQL!

---

### Option 3: Deploy Full Stack to Render.com
1. **Database**: On Render dashboard, click **New &rarr; PostgreSQL**. Name it `talentai-postgres` (Free tier). Copy the **Internal Database URL**.
2. **Backend Web Service**:
   - Root Directory: `backend`
   - Build Command: `npm install`
   - Start Command: `npm run db:init && npm start`
   - Environment Variables:
     - `DATABASE_URL` = `<paste your Render Postgres URL>`
     - `PORT` = `5000`
3. **Frontend Static Site**:
   - Root Directory: `frontend`
   - Build Command: `npm run build`
   - Publish Directory: `dist`

---

## 🌐 SQL REST API Endpoints

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/sql/summary` | Database status, connected SQL dialect, and record counts |
| `GET` | `/api/sql/jobs` | Retrieve all job requisitions from SQL `jobs` table |
| `POST` | `/api/sql/jobs` | Create a new job requisition in SQL `jobs` table |
| `GET` | `/api/sql/candidates` | Retrieve candidate leaderboard sorted by AI score |
| `POST` | `/api/sql/candidates` | Add new applicant profile with AI score and skills |
| `PATCH` | `/api/sql/candidates/:id/stage` | Update candidate ATS stage (e.g., *Screened &rarr; Interview Scheduled*) |
| `GET` | `/api/sql/interviews` | List all scheduled sessions with joined candidate details |
| `POST` | `/api/sql/interviews` | Book an interview with live Google Meet link |
| `POST` | `/api/sql/scorecards` | Save live evaluation scorecard (1-5 stars & notes) |
| `GET` | `/api/sql/export` | Download full SQL script dump of active database |

---

## 📋 Sample SQL Verification Queries

To verify or query candidate data directly using `psql`, pgAdmin, or SQLite:

```sql
-- 1. Top 3 Candidates Ranked by AI Match Score
SELECT name, current_title, experience_years, ai_score, stage
FROM candidates
ORDER BY ai_score DESC
LIMIT 3;

-- 2. Candidates in Active Interview or Evaluation Stages
SELECT c.name, c.current_title, c.ai_score, i.scheduled_date, i.time_slot, i.interview_type
FROM candidates c
INNER JOIN interviews i ON c.id = i.candidate_id
WHERE i.status = 'Confirmed';

-- 3. Number of Applicants and Average AI Score per Job
SELECT j.title, COUNT(c.id) AS total_applicants, ROUND(AVG(c.ai_score), 1) AS avg_match_score
FROM jobs j
LEFT JOIN candidates c ON j.id = c.job_id
GROUP BY j.id, j.title;
```
