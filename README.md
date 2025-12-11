Reportif.ai (Reportify)

Reportif.ai — or simply Reportify — is an embeddable AI-powered feedback and debugging agent designed to capture real user experiences at the exact moment an error occurs, and automatically convert them into actionable GitHub issues.

Reportify closes the gap between user frustration and developer insight by combining real-time error detection, voice-based user feedback, and automated code analysis.

🚀 What Reportify Does
1. Detects errors in real-time

Embed Reportify into your web application using a simple JavaScript snippet or iframe. When a user encounters a frontend error, the widget automatically triggers.

2. Starts a voice conversation with the user

A small consent prompt appears:

“Could you tell me what went wrong?”

If the user agrees, the AI agent asks short, natural questions:

What were you trying to do?

What path did you take?

What appeared on your screen?

This captures real user context without forms or typing.

3. Analyzes your codebase through GitHub

Using your GitHub API key, Reportify:

Fetches relevant repository files

Searches for code related to the detected error

Performs automated static reasoning to identify likely sources

4. Creates a complete GitHub Issue

Each issue includes:

User’s voice-derived feedback (converted to text)

Detected error stack and reproduction details

Probable cause in the code

A proposed solution or fix path

Developers receive immediately actionable bug reports instead of vague, incomplete feedback.

🧩 Why Reportify?

Eliminates abandoned bug reports

Captures human context that automated logging lacks

Speeds up debugging and reduces engineering overhead

Integrates seamlessly into existing GitHub workflows

Requires minimal setup

Reportify doesn’t just report bugs.
It explains them.

📦 Installation
<!-- Example embeddable widget -->
<script src="https://cdn.reportif.ai/widget.js"
        data-project-id="YOUR_PROJECT_ID">
</script>


Or embed as an iframe:

<iframe src="https://cdn.reportif.ai/agent"
        data-project-id="YOUR_PROJECT_ID"
        style="border:0;width:0;height:0;"></iframe>


Full installation docs coming soon.

🔧 Configuration

Create a .env file or environment variables:

REPORTIFY_GITHUB_API_KEY=YOUR_KEY
REPORTIFY_PROJECT_ID=your_project_id
REPORTIFY_API_ENDPOINT=https://api.reportif.ai

🛠️ Tech Stack

JavaScript embeddable widget (client-side)

Voice processing + transcription

Error monitoring

LLM-based reasoning engine

GitHub API integration

Server-side code analysis pipeline

📚 Roadmap

Automatic PR generation

Multi-language support

Session replay integration

SDK for React, Vue, and Next.js

Error heatmaps

Custom prompt scripting for voice agent
