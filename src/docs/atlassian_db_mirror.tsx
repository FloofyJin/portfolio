import React from 'react';
import { Helmet } from 'react-helmet';
import './atlassian_db_mirror.css';

const favicon = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 144 144'%3E%3Crect width='144' height='144' rx='32' fill='%2310293A'/%3E%3Cpath d='M40 26 V58 A32 8 0 0 0 104 58 V26 Z' fill='%2346DDB9'/%3E%3Cellipse cx='72' cy='26' rx='32' ry='8' fill='%23A6F2DE'/%3E%3Cpath d='M40 86 V118 A32 8 0 0 0 104 118 V86 Z' fill='%2346DDB9' opacity='.35'/%3E%3C/svg%3E";

// Renders a shell / config snippet, dimming everything from "#" to the end of a line.
function Code({ children }: { children: string }) {
    const lines = children.replace(/^\n/, '').split('\n');
    return (
        <pre><code>
            {lines.map((line, i) => {
                const hash = line.indexOf('#');
                return (
                    <React.Fragment key={i}>
                        {hash === -1 ? line : <>{line.slice(0, hash)}<span className="c">{line.slice(hash)}</span></>}
                        {i < lines.length - 1 && '\n'}
                    </React.Fragment>
                );
            })}
        </code></pre>
    );
}

function AtlassianDbMirror() {

    // The site uses HashRouter, so "#section" links would be treated as routes.
    // Scroll to the section instead.
    const handleAnchorClick = (e: React.MouseEvent<HTMLDivElement>) => {
        const link = (e.target as HTMLElement).closest('a');
        const href = link?.getAttribute('href');
        if (!href || !href.startsWith('#')) return;
        e.preventDefault();
        document.getElementById(href.slice(1))?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <div className="dbmirror-doc" onClick={handleAnchorClick}>
            <Helmet>
                <title>DB Mirror for Jira – Documentation</title>
                <meta name="description" content="Set up DB Mirror for Jira: keep a live copy of Jira Cloud in your own Postgres or SQL Server, using Jira Data Center's table names, so your SQL reports keep working." />
                <link rel="icon" type="image/svg+xml" href={favicon} />
            </Helmet>

            <header className="site-header">
                <svg viewBox="0 0 144 144" aria-hidden="true">
                    <defs>
                        <linearGradient id="hdr-fade" x1="0" y1="78" x2="0" y2="126" gradientUnits="userSpaceOnUse">
                            <stop offset="0" stopColor="#fff" stopOpacity="0.55" /><stop offset="1" stopColor="#fff" stopOpacity="0.08" />
                        </linearGradient>
                        <mask id="hdr-mask" maskUnits="userSpaceOnUse" x="0" y="72" width="144" height="72"><rect x="0" y="72" width="144" height="72" fill="url(#hdr-fade)" /></mask>
                        <g id="hdr-cyl">
                            <path d="M40 26 V58 A32 8 0 0 0 104 58 V26 Z" fill="#46DDB9" />
                            <ellipse cx="72" cy="26" rx="32" ry="8" fill="#A6F2DE" />
                            <path d="M40 37 A32 8 0 0 0 104 37" fill="none" stroke="#10293A" strokeWidth="3" />
                            <path d="M40 48 A32 8 0 0 0 104 48" fill="none" stroke="#10293A" strokeWidth="3" />
                        </g>
                    </defs>
                    <rect width="144" height="144" rx="32" fill="#10293A" />
                    <use href="#hdr-cyl" />
                    <line x1="26" y1="72" x2="118" y2="72" stroke="#A6F2DE" strokeWidth="2.5" strokeLinecap="round" opacity="0.75" />
                    <g mask="url(#hdr-mask)"><use href="#hdr-cyl" transform="translate(0 144) scale(1 -1)" /></g>
                </svg>
                <a className="brand" href="#top">DB Mirror <span>for Jira</span></a>
                <nav aria-label="Site">
                    <a href="#setup">Setup</a>
                    <a href="#commands">Commands</a>
                    <a href="#troubleshooting">Troubleshooting</a>
                    <a href="#support">Support</a>
                </nav>
            </header>

            <div className="layout" id="top">
                <aside className="toc" aria-label="On this page">
                    <div className="toc-inner">
                        <h2>On this page</h2>
                        <ol>
                            <li><a href="#how-it-works">How it works</a></li>
                            <li><a href="#requirements">Requirements</a></li>
                            <li><a href="#setup">Setup</a>
                                <ol>
                                    <li><a href="#bucket">1. Create a bucket</a></li>
                                    <li><a href="#configure">2. Configure the app</a></li>
                                    <li><a href="#install-cli">3. Install the CLI</a></li>
                                    <li><a href="#database">4. Connect your database</a></li>
                                    <li><a href="#load">5. Load and keep in sync</a></li>
                                </ol>
                            </li>
                            <li><a href="#reports">Using your Data Center reports</a></li>
                            <li><a href="#whats-mirrored">What's mirrored</a></li>
                            <li><a href="#monitoring">Monitoring</a></li>
                            <li><a href="#admin-page">Admin page reference</a></li>
                            <li><a href="#commands">Command reference</a></li>
                            <li><a href="#sql-server">SQL Server notes</a></li>
                            <li><a href="#security">Security and your data</a></li>
                            <li><a href="#troubleshooting">Troubleshooting</a></li>
                            <li><a href="#support">Support</a></li>
                        </ol>
                    </div>
                </aside>

                <main>
                    <h1>DB Mirror for Jira</h1>
                    <p className="lead">A live copy of your Jira Cloud data in your own Postgres or SQL Server database, using Jira Data Center's table names, so the SQL reports you wrote for Data Center keep working after you move to Cloud.</p>

                    {/* ================================================================ */}
                    <h2 id="how-it-works">How it works</h2>
                    <p>DB Mirror has two parts: an app on Jira Cloud, and a small command-line tool, <code>sqlmirror</code>, that you run in your own network.</p>
                    <div className="flow" role="list" aria-label="Data path">
                        <div className="step" role="listitem"><b>Jira Cloud</b>Issues, history, comments, worklogs, links, sprints change.</div>
                        <div className="arrow" aria-hidden="true">→</div>
                        <div className="step" role="listitem"><b>DB Mirror app</b>Batches the changes and writes them as files.</div>
                        <div className="arrow" aria-hidden="true">→</div>
                        <div className="step yours" role="listitem"><b>Your bucket</b>Amazon S3, Cloudflare R2 or Google Cloud Storage.</div>
                        <div className="arrow" aria-hidden="true">→</div>
                        <div className="step yours" role="listitem"><b><code>sqlmirror apply</code></b>Runs on your machine and loads the files.</div>
                        <div className="arrow" aria-hidden="true">→</div>
                        <div className="step yours" role="listitem"><b>Your database</b>Postgres or SQL Server, with Data Center table names.</div>
                    </div>
                    <ul>
                        <li>The app never connects to your database and never asks for an API token. It only writes files to a bucket you own, with a write-only key you give it.</li>
                        <li>The command-line tool runs where your database is. It reads the bucket and writes the database; nothing else is sent anywhere.</li>
                        <li>Changes reach the bucket on the schedule you set in the app (every 5 minutes by default), and your database whenever <code>sqlmirror apply</code> runs.</li>
                    </ul>

                    {/* ================================================================ */}
                    <h2 id="requirements">Requirements</h2>
                    <div className="table-wrap">
                        <table>
                            <thead><tr><th>You need</th><th>Details</th></tr></thead>
                            <tbody>
                                <tr><td>Jira Cloud</td><td>Jira administrator, to install and configure the app.</td></tr>
                                <tr><td>A storage bucket</td><td>Amazon S3, Cloudflare R2 or Google Cloud Storage. Costs are usually a few cents a month.</td></tr>
                                <tr><td>A database</td><td>PostgreSQL 13 or later, or SQL Server 2016 or later (including Azure SQL Database and Azure SQL Managed Instance).</td></tr>
                                <tr><td>A machine to run the CLI</td><td>Linux, macOS or Windows with Python 3.10 or later, able to reach the bucket and the database. A small VM or the database server itself is fine.</td></tr>
                            </tbody>
                        </table>
                    </div>

                    {/* ================================================================ */}
                    <h2 id="setup">Setup</h2>
                    <p>About 20 minutes from install to a loaded database.</p>

                    <h3 id="bucket">1. Create a bucket and a write-only key</h3>
                    <p>The app needs a key that can <em>only write</em> to one folder of one bucket. The command-line tool uses a separate key (or your own credentials) to read it.</p>

                    <h4>Amazon S3</h4>
                    <ol className="steps">
                        <li>In the AWS console, <strong>S3 → Create bucket</strong>. Any name and region; keep "Block all public access" on.</li>
                        <li><strong>IAM → Users → Create user</strong> (no console access), for example <code>dbmirror-writer</code>, with this inline policy. Replace the bucket name, and keep the folder (<code>sqlmirror/</code> here) the same as the app's <em>Folder prefix</em>:
                            <Code>{`
{
  "Version": "2012-10-17",
  "Statement": [{
    "Effect": "Allow",
    "Action": "s3:PutObject",
    "Resource": "arn:aws:s3:::YOUR-BUCKET/sqlmirror/*"
  }]
}`}</Code></li>
                        <li>Create an access key for that user (type <em>Application running outside AWS</em>). You'll paste it into the app.</li>
                        <li>For the command-line tool, use credentials that can read: <code>s3:ListBucket</code> on the bucket and <code>s3:GetObject</code> on <code>YOUR-BUCKET/sqlmirror/*</code>. Your own AWS profile, an instance role, or a second IAM user all work.</li>
                    </ol>

                    <h4>Cloudflare R2</h4>
                    <ol className="steps">
                        <li><strong>R2 → Create bucket</strong>.</li>
                        <li><strong>R2 → Manage R2 API Tokens → Create API token</strong> with <em>Object Read &amp; Write</em>, limited to that bucket. Note the access key ID and secret.</li>
                        <li>Your endpoint is <code>https://&lt;account-id&gt;.r2.cloudflarestorage.com</code> and the region is <code>auto</code>.</li>
                    </ol>

                    <h4>Google Cloud Storage</h4>
                    <ol className="steps">
                        <li>Create a bucket.</li>
                        <li><strong>Cloud Storage → Settings → Interoperability</strong>: create an HMAC key for a service account that can create objects in that bucket.</li>
                        <li>The endpoint is <code>https://storage.googleapis.com</code> and the region is <code>auto</code>.</li>
                    </ol>

                    <h3 id="configure">2. Configure the app</h3>
                    <p>In Jira, open <strong>Settings (⚙) → Apps → DB Mirror</strong> in the left sidebar, then fill in:</p>
                    <div className="table-wrap">
                        <table>
                            <thead><tr><th>Field</th><th>What to enter</th></tr></thead>
                            <tbody>
                                <tr><td>Bucket name</td><td>The bucket from step 1.</td></tr>
                                <tr><td>Region</td><td>For example <code>us-west-1</code>. Use <code>auto</code> for R2 and Google Cloud Storage.</td></tr>
                                <tr><td>Endpoint</td><td>Leave empty for AWS. R2: <code>https://&lt;account-id&gt;.r2.cloudflarestorage.com</code>. Google: <code>https://storage.googleapis.com</code>.</td></tr>
                                <tr><td>Folder prefix</td><td>Where files go in the bucket, for example <code>sqlmirror/</code>. Must match the key's permission.</td></tr>
                                <tr><td>Access key ID / Secret access key</td><td>The write-only key from step 1. The secret is stored encrypted by Atlassian Forge and only shown to Jira admins on request.</td></tr>
                                <tr><td>Projects to mirror</td><td>Comma-separated project keys, for example <code>ENG, OPS</code>. Leave empty to mirror every project.</td></tr>
                                <tr><td>Sync schedule (cron, UTC)</td><td>When changes are written to the bucket. Default <code>*/5 * * * *</code> (every 5 minutes, the fastest). Changes are always recorded; the schedule only controls when they're written. Examples: <code>0 * * * *</code> hourly, <code>0 2 * * *</code> daily at 02:00 UTC.</td></tr>
                            </tbody>
                        </table>
                    </div>
                    <ol className="steps">
                        <li>Click <strong>Save settings</strong>, then <strong>Test connection</strong>. You should see “Wrote …/_sqlmirror/connection-test.json to your-bucket”.</li>
                        <li>Click <strong>Full resync</strong> to write every issue in the chosen projects once. The status panel shows progress; large sites take a while because the app shares Jira's rate limits politely. You can skip this if you load history with <code>sqlmirror backfill</code> instead (step 5).</li>
                    </ol>

                    <h3 id="install-cli">3. Install the command-line tool</h3>
                    <p>On the machine that can reach your bucket and database:</p>
                    <Code>{`
pip install sqlmirror                  # Postgres
pip install "sqlmirror[sqlserver]"     # Postgres and SQL Server
sqlmirror --version`}</Code>
                    <p>We recommend a virtual environment, or <a href="https://pipx.pypa.io/">pipx</a> (<code>pipx install sqlmirror</code>), so it stays separate from other Python software. Upgrade later with <code>pip install --upgrade sqlmirror</code>.</p>

                    <h3 id="database">4. Connect your database</h3>
                    <p>Create an empty database (for example <code>jira_mirror</code>) and a login that can create tables in it. Then put the settings in a <code>.env</code> file in the folder you run <code>sqlmirror</code> from (or set them as environment variables):</p>
                    <Code>{`
# Postgres
DATABASE_URL=postgresql://mirror_user:password@db-host:5432/jira_mirror
# ...or SQL Server (encode special characters in the password, e.g. ! as %21)
# DATABASE_URL=sqlserver://mirror_user:password@db-host:1433/jira_mirror
# Azure SQL: add ?encrypt=true

# Where the app writes (the same bucket and prefix as in Jira)
SQLMIRROR_SOURCE=s3://your-bucket/sqlmirror/
AWS_REGION=us-west-1
# R2 / Google Cloud Storage:
# SQLMIRROR_S3_ENDPOINT=https://<account-id>.r2.cloudflarestorage.com
# Read credentials: AWS_PROFILE=..., or AWS_ACCESS_KEY_ID / AWS_SECRET_ACCESS_KEY`}</Code>
                    <Code>{`sqlmirror init-db      # creates the tables; safe to run again`}</Code>
                    <div className="callout">
                        <p><strong>No permission to create tables?</strong> A DBA can run the statements from <code>sqlmirror ddl</code> (or <code>sqlmirror ddl --dialect sqlserver</code>) first. Every statement is safe to run more than once.</p>
                    </div>

                    <h3 id="load">5. Load and keep in sync</h3>
                    <h4>Load history (choose one)</h4>
                    <ul>
                        <li><strong>From the app:</strong> after <em>Full resync</em> in step 2, run <code>sqlmirror apply</code>. Nothing else needed.</li>
                        <li><strong>With your own API token</strong> (faster for large sites, and doesn't use the app's Jira budget): create a token at <a href="https://id.atlassian.com/manage-profile/security/api-tokens">id.atlassian.com</a> and run a one-time backfill. The token stays on your machine.
                            <Code>{`
JIRA_SITE=https://your-site.atlassian.net
JIRA_EMAIL=you@example.com
JIRA_API_TOKEN=...

sqlmirror backfill                     # all projects; --project ENG to limit; --resume after an interruption`}</Code></li>
                    </ul>

                    <h4>Keep it current</h4>
                    <Code>{`
sqlmirror apply                         # once: applies every new file
sqlmirror apply --cron "*/15 * * * *"   # keep running, on a schedule (UTC)
sqlmirror apply --watch --interval 60   # keep running, check every 60 seconds`}</Code>
                    <p><code>apply</code> is safe to run as often as you like: each file is applied once, and an older copy of an issue never overwrites a newer one. To run it from your own scheduler instead, call plain <code>sqlmirror apply</code> from cron, a systemd timer or Windows Task Scheduler.</p>
                    <Code>{`
# crontab: every 15 minutes
*/15 * * * * cd /opt/dbmirror && /opt/dbmirror/venv/bin/sqlmirror apply >> apply.log 2>&1`}</Code>

                    {/* ================================================================ */}
                    <h2 id="reports">Using your Data Center reports</h2>
                    <p>Point your reports at the mirror database. Most run unchanged: tables, columns and their meaning match Jira Data Center. Two things change in any Cloud migration, and DB Mirror has tools for both.</p>

                    <h3>Check and convert report SQL</h3>
                    <Code>{`sqlmirror check-sql reports/ --dialect sqlserver     # the dialect your reports were written in`}</Code>
                    <p>For every statement it reports one of: <em>works as-is</em>, <em>rewritten</em> (fixed automatically), <em>check</em> (a warning to review) or <em>needs work</em>. It writes fixed SQL and a <code>report.md</code> to <code>sqlmirror-checked/</code>, and compiles each statement against your mirror to prove it runs. It also converts between Postgres and SQL Server: <code>--target sqlserver</code> or <code>--target postgres</code>.</p>

                    <h3>Hard-coded IDs</h3>
                    <p>Status, custom field, project, version, sprint and user IDs all change when you move to Cloud, so <code>WHERE issuestatus = '10001'</code> may point at a different status. Map them by name:</p>
                    <ol className="steps">
                        <li>Print the export query and run it on your <em>old Data Center database</em>, saving the result as CSV:
                            <Code>{`sqlmirror idmap export-sql --dialect sqlserver > export.sql`}</Code></li>
                        <li>Match it to the mirror: <code>sqlmirror idmap build dc_export.csv</code> → writes <code>id_map.csv</code>.</li>
                        <li>Rewrite the reports: <code>sqlmirror check-sql reports/ --dialect sqlserver --id-map id_map.csv</code>.</li>
                    </ol>
                    <div className="callout">
                        <p><strong>Users</strong>Cloud identifies users by Atlassian account ID. User columns (<code>assignee</code>, <code>reporter</code>, <code>author</code>…) hold account IDs; join <code>app_user</code> and <code>cwd_user</code> for display names and, where Atlassian makes them visible, email addresses.</p>
                    </div>

                    {/* ================================================================ */}
                    <h2 id="whats-mirrored">What's mirrored</h2>
                    <div className="table-wrap">
                        <table>
                            <thead><tr><th>Data</th><th>Tables</th></tr></thead>
                            <tbody>
                                <tr><td>Issues</td><td><code>jiraissue</code>, <code>label</code>, <code>customfieldvalue</code>, <code>nodeassociation</code> (fix versions, affects versions, components)</td></tr>
                                <tr><td>History</td><td><code>changegroup</code>, <code>changeitem</code></td></tr>
                                <tr><td>Comments and work logs</td><td><code>jiraaction</code>, <code>worklog</code></td></tr>
                                <tr><td>Links and hierarchy</td><td><code>issuelink</code>, <code>issuelinktype</code>. Sub-tasks and epic children appear as <code>jira_subtask_link</code> and <code>Epic-Story Link</code> links, as on Data Center.</td></tr>
                                <tr><td>Attachments (details, not files)</td><td><code>fileattachment</code></td></tr>
                                <tr><td>Configuration</td><td><code>project</code>, <code>project_key</code>, <code>projectcategory</code>, <code>issuestatus</code>, <code>issuetype</code>, <code>priority</code>, <code>resolution</code>, <code>projectversion</code>, <code>component</code>, <code>customfield</code>, <code>customfieldoption</code></td></tr>
                                <tr><td>People</td><td><code>app_user</code>, <code>cwd_user</code></td></tr>
                                <tr><td>Sprints and boards</td><td><code>AO_60DB71_SPRINT</code>, <code>AO_60DB71_RAPIDVIEW</code></td></tr>
                            </tbody>
                        </table>
                    </div>
                    <p><strong>Not mirrored</strong>, because Jira Cloud doesn't expose them or they have no Cloud equivalent: workflow engine tables (<code>os_wfentry</code>, <code>os_currentstep</code>, <code>os_historystep</code>; use <code>changeitem</code> rows where <code>field = 'status'</code> instead), permission, notification and field configuration schemes, groups and project roles, saved filters, property tables, and board names. <code>check-sql</code> tells you when a report uses one of these.</p>
                    <p>Tables starting with <code>sqlmirror_</code> are DB Mirror's own bookkeeping. Don't edit them.</p>

                    {/* ================================================================ */}
                    <h2 id="monitoring">Monitoring</h2>
                    <Code>{`
sqlmirror status                # counts per project, newest data, last file applied
sqlmirror log                   # recent apply / backfill runs, with errors
sqlmirror log --app             # also the app's sync jobs and which issues each changed
sqlmirror reconcile             # compare issue counts with Jira (uses your API token)
sqlmirror reconcile --deep      # compare every issue's last-updated time
sqlmirror reconcile --repair    # re-fetch anything missing or stale, remove deleted issues`}</Code>
                    <p>The app's admin page shows the same from Jira's side: last sync, issues written, changes waiting, Jira API usage and a sync log.</p>

                    {/* ================================================================ */}
                    <h2 id="admin-page">Admin page reference</h2>
                    <div className="table-wrap">
                        <table>
                            <thead><tr><th>Button</th><th>What it does</th></tr></thead>
                            <tbody>
                                <tr><td>Save settings</td><td>Stores the bucket and schedule. Changing <em>Projects to mirror</em> during a full resync restarts it with the new list.</td></tr>
                                <tr><td>Test connection</td><td>Writes a small test file to the bucket and shows the result.</td></tr>
                                <tr><td>Sync now</td><td>Writes waiting changes immediately instead of at the next scheduled time.</td></tr>
                                <tr><td>Refresh configuration</td><td>Re-reads projects, statuses, fields, versions and components.</td></tr>
                                <tr><td>Full resync / Cancel resync</td><td>Writes every issue in the chosen projects again, in the background; cancel stops it.</td></tr>
                                <tr><td>Refresh</td><td>Reloads the status shown on the page.</td></tr>
                            </tbody>
                        </table>
                    </div>
                    <p>The app also checks hourly for changes whose Jira events were missed, and refreshes configuration daily.</p>

                    {/* ================================================================ */}
                    <h2 id="commands">Command reference</h2>
                    <p>Every command reads <code>.env</code> in the current folder (or <code>--env-file PATH</code>) and accepts <code>--dsn</code> to override <code>DATABASE_URL</code>. Run <code>sqlmirror &lt;command&gt; --help</code> for all options.</p>
                    <div className="table-wrap">
                        <table>
                            <thead><tr><th>Command</th><th>Does</th></tr></thead>
                            <tbody>
                                <tr><td><code>sqlmirror init-db</code></td><td>Create the mirror tables (safe to run again).</td></tr>
                                <tr><td><code>sqlmirror ddl [--dialect sqlserver]</code></td><td>Print the CREATE TABLE statements, for a DBA to run.</td></tr>
                                <tr><td><code>sqlmirror apply [s3://bucket/prefix]</code></td><td>Load the app's change files. <code>--watch</code>, <code>--interval N</code> or <code>--cron "EXPR"</code> to keep running; <code>--endpoint-url</code>, <code>--region</code>, <code>--profile</code> for the bucket.</td></tr>
                                <tr><td><code>sqlmirror backfill</code></td><td>Load all issues and history with your API token. <code>--project KEY</code> (repeatable), <code>--resume</code>, <code>--workers N</code>.</td></tr>
                                <tr><td><code>sqlmirror check-jira</code></td><td>Check your API token works and list the projects it can see.</td></tr>
                                <tr><td><code>sqlmirror reconcile</code></td><td>Compare the mirror with Jira. <code>--deep</code>, <code>--repair</code>, <code>--project KEY</code>.</td></tr>
                                <tr><td><code>sqlmirror status</code></td><td>What's in the mirror and how fresh it is.</td></tr>
                                <tr><td><code>sqlmirror log [--app]</code></td><td>Recent runs on the database side, and with <code>--app</code> the app's sync jobs.</td></tr>
                                <tr><td><code>sqlmirror check-sql PATHS…</code></td><td>Check and rewrite Data Center report SQL. <code>--dialect</code> (postgres, sqlserver, mysql, oracle), <code>--target</code>, <code>--id-map</code>, <code>--out</code>, <code>--no-explain</code>.</td></tr>
                                <tr><td><code>sqlmirror idmap export-sql</code></td><td>Print the query to export IDs and names from your Data Center database.</td></tr>
                                <tr><td><code>sqlmirror idmap build FILE.csv</code></td><td>Match that export to Cloud IDs and write <code>id_map.csv</code>.</td></tr>
                            </tbody>
                        </table>
                    </div>

                    <h3>Settings</h3>
                    <div className="table-wrap">
                        <table>
                            <thead><tr><th>Variable</th><th>Meaning</th></tr></thead>
                            <tbody>
                                <tr><td><code>DATABASE_URL</code></td><td><code>postgresql://…</code> or <code>sqlserver://…</code></td></tr>
                                <tr><td><code>SQLMIRROR_SCHEMA</code></td><td>Schema for the tables (default <code>public</code> on Postgres, <code>dbo</code> on SQL Server).</td></tr>
                                <tr><td><code>SQLMIRROR_SOURCE</code></td><td>The bucket and prefix the app writes to, as <code>s3://bucket/prefix/</code>.</td></tr>
                                <tr><td><code>SQLMIRROR_S3_ENDPOINT</code></td><td>Endpoint for R2 or Google Cloud Storage.</td></tr>
                                <tr><td><code>AWS_REGION</code>, <code>AWS_PROFILE</code>, <code>AWS_ACCESS_KEY_ID</code>, <code>AWS_SECRET_ACCESS_KEY</code></td><td>Credentials for reading the bucket (standard AWS settings; also used for R2 and Google HMAC keys).</td></tr>
                                <tr><td><code>JIRA_SITE</code>, <code>JIRA_EMAIL</code>, <code>JIRA_API_TOKEN</code></td><td>Only for <code>backfill</code>, <code>reconcile</code> and <code>check-jira</code>.</td></tr>
                            </tbody>
                        </table>
                    </div>

                    {/* ================================================================ */}
                    <h2 id="sql-server">SQL Server notes</h2>
                    <ul>
                        <li>Install with <code>pip install "sqlmirror[sqlserver]"</code>. The driver is pure Python; no ODBC driver is needed.</li>
                        <li>Tables use the column types Jira Data Center used on SQL Server (<code>numeric(18,0)</code>, <code>nvarchar</code>, <code>datetime</code>, <code>bit</code>).</li>
                        <li>Connection options go after <code>?</code>: <code>encrypt=true</code> (Azure SQL), <code>instance=NAME</code> (named instance), <code>schema=NAME</code>, <code>trustservercertificate=true</code>, <code>login_timeout=30</code>. Only SQL Server logins are supported, not Windows or Microsoft Entra ID authentication.</li>
                        <li><strong>Time zone.</strong> Times are stored in UTC. Data Center on SQL Server stored the Jira server's local time; if reports use <code>GETDATE()</code> or group by day and must match old numbers, add <code>timezone=America/New_York</code> (your old server's zone). Due dates and version dates always keep their calendar day.</li>
                        <li>Use a dedicated database for the mirror. With a non-default schema, reports must name it (<code>jira.jiraissue</code>) or run as a login whose default schema it is.</li>
                        <li>SQL Server's default collation ignores case, as it did for Data Center, so <code>GROUP BY label</code> treats <code>Backend</code> and <code>backend</code> as one.</li>
                    </ul>

                    {/* ================================================================ */}
                    <h2 id="security">Security and your data</h2>
                    <ul>
                        <li><strong>Where data goes.</strong> Issue data goes from Jira to your bucket, then from your bucket to your database. DB Mirror's developer never receives or stores it.</li>
                        <li><strong>Credentials.</strong> The app holds only the bucket key you give it, ideally write-only to one folder, stored encrypted in Atlassian Forge and shown only to Jira administrators. Database credentials and any Jira API token stay on the machine running <code>sqlmirror</code>.</li>
                        <li><strong>What's written.</strong> Issue fields, history, comments, work logs, links, attachment details (not the files), and users' account IDs, display names and, when visible, email addresses. Files are gzipped JSON, one folder per hour.</li>
                        <li><strong>Permissions.</strong> The app reads Jira work items (<code>read:jira-work</code>), keeps its settings in Forge storage, and can only reach Amazon S3, Cloudflare R2 and Google Cloud Storage addresses.</li>
                        <li><strong>Retention.</strong> Files in the bucket aren't deleted by DB Mirror. Add a lifecycle rule (for example, delete after 30 days) once <code>apply</code> runs regularly.</li>
                        <li><strong>Deleted issues and projects</strong> are removed from the mirror on the next apply.</li>
                    </ul>

                    {/* ================================================================ */}
                    <h2 id="troubleshooting">Troubleshooting</h2>
                    <h4>Test connection fails</h4>
                    <ul>
                        <li><em>Access denied:</em> the key's permission must cover the bucket <em>and</em> the folder prefix, for example <code>arn:aws:s3:::your-bucket/sqlmirror/*</code>.</li>
                        <li><em>Wrong region / redirect:</em> set Region to the bucket's region (shown in the S3 console); <code>auto</code> for R2 and Google.</li>
                        <li><em>Endpoint rejected:</em> only Amazon S3, Cloudflare R2 and Google Cloud Storage addresses are allowed.</li>
                    </ul>
                    <h4><code>apply</code> finds no files</h4>
                    <ul>
                        <li>Check <code>SQLMIRROR_SOURCE</code> matches the app's bucket and <em>Folder prefix</em> exactly, including the trailing <code>/</code>.</li>
                        <li>Check the admin page: is anything <em>waiting to sync</em>, and has the schedule run since your last change?</li>
                    </ul>
                    <h4><code>apply</code> says the license is inactive</h4>
                    <p>The app's subscription on your Jira site has ended. Renew it in Jira (<strong>Apps → Manage apps</strong>); applying resumes from where it stopped.</p>
                    <h4>A report gives different numbers from Data Center</h4>
                    <p>Run <code>sqlmirror check-sql</code> on it: hard-coded IDs, user names and tables that aren't mirrored are the usual causes. Then <code>sqlmirror reconcile --deep</code> to rule out missing data.</p>
                    <h4>SQL Server: login fails or a value is "too long"</h4>
                    <ul>
                        <li>Percent-encode special characters in the password (<code>!</code> → <code>%21</code>, <code>@</code> → <code>%40</code>).</li>
                        <li>Azure SQL needs <code>?encrypt=true</code>.</li>
                        <li>"Value too long for …" means a Jira value doesn't fit Data Center's column size; the message names the column. Contact support.</li>
                    </ul>

                    {/* ================================================================ */}
                    <h2 id="support">Support</h2>
                    <p>Email <a href="mailto:jinsungpark@cinna.dev">jinsungpark@cinna.dev</a> with your Jira site address, what you ran, and the output of <code>sqlmirror log</code> and <code>sqlmirror --version</code>. Please don't send API tokens, keys or passwords.</p>
                    <p><a href="/privacy">Privacy policy</a> · <a href="/terms">Terms of use</a> · <a href="https://pypi.org/project/sqlmirror/">sqlmirror on PyPI</a></p>
                </main>
            </div>

            <footer>
                DB Mirror for Jira. Jira and Atlassian are trademarks of Atlassian; DB Mirror is an independent app.
            </footer>
        </div>
    );
}

export default AtlassianDbMirror;
