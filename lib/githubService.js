import { Octokit } from '@octokit/rest';

/**
 * GitHub API Client
 * Handles all interactions with the GitHub repository
 */
class GitHubService {
  constructor() {
    this.octokit = new Octokit({
      auth: process.env.GITHUB_TOKEN,
    });
    this.owner = process.env.GITHUB_OWNER;
    this.repo = process.env.GITHUB_REPO;
  }

  /**
   * Get the full repository tree structure recursively
   * @returns {Promise<Array>} Array of all files and directories with their paths
   */
  async getFullRepoTree() {
    try {
      console.log(`[GitHub] Fetching full repository tree recursively`);
      
      // Use the Git Trees API for efficient recursive fetching
      const { data } = await this.octokit.git.getTree({
        owner: this.owner,
        repo: this.repo,
        tree_sha: 'HEAD',
        recursive: 'true',
      });

      // Format and filter the tree
      const tree = data.tree
        .filter(item => {
          // Exclude common non-source directories
          const excludePaths = [
            '.git/',
            'node_modules/',
            '.next/',
            'dist/',
            'build/',
            '.vercel/',
            'coverage/',
          ];
          return !excludePaths.some(exclude => item.path.startsWith(exclude));
        })
        .map(item => ({
          path: item.path,
          type: item.type === 'blob' ? 'file' : 'dir',
          size: item.size,
          sha: item.sha,
        }));

      console.log(`[GitHub] Retrieved ${tree.length} items from repository`);
      return tree;
    } catch (error) {
      console.error('[GitHub] Error fetching full tree:', error.message);
      throw new Error(`Failed to fetch full repository tree: ${error.message}`);
    }
  }

  /**
   * Get the repository tree structure
   * @param {string} path - The directory path to explore (e.g., "api/payment")
   * @returns {Promise<Array>} Array of file/directory objects
   */
  async getRepoTree(path = '') {
    try {
      console.log(`[GitHub] Fetching tree for path: ${path || 'root'}`);
      
      const { data } = await this.octokit.repos.getContent({
        owner: this.owner,
        repo: this.repo,
        path: path,
      });

      // Format the response
      const tree = Array.isArray(data) ? data : [data];
      
      return tree.map(item => ({
        name: item.name,
        path: item.path,
        type: item.type, // 'file' or 'dir'
        size: item.size,
        sha: item.sha,
      }));
    } catch (error) {
      console.error('[GitHub] Error fetching tree:', error.message);
      
      // If path doesn't exist, return empty array instead of throwing
      if (error.status === 404) {
        console.log(`[GitHub] Path not found: ${path}, returning empty tree`);
        return [];
      }
      
      throw new Error(`Failed to fetch repository tree: ${error.message}`);
    }
  }

  /**
   * Read file content from the repository
   * @param {string} filePath - The full path to the file
   * @param {number} startLine - Optional start line number (1-indexed)
   * @param {number} endLine - Optional end line number (1-indexed)
   * @returns {Promise<Object>} File content and metadata
   */
  async readFileContent(filePath, startLine = null, endLine = null) {
    try {
      console.log(`[GitHub] Reading file: ${filePath}`);
      
      const { data } = await this.octokit.repos.getContent({
        owner: this.owner,
        repo: this.repo,
        path: filePath,
      });

      if (data.type !== 'file') {
        throw new Error(`${filePath} is not a file`);
      }

      // Decode base64 content
      const content = Buffer.from(data.content, 'base64').toString('utf-8');
      
      // If line range specified, extract only those lines
      let extractedContent = content;
      if (startLine !== null || endLine !== null) {
        const lines = content.split('\n');
        const start = (startLine || 1) - 1; // Convert to 0-indexed
        const end = endLine || lines.length;
        extractedContent = lines.slice(start, end).join('\n');
      }

      return {
        path: data.path,
        content: extractedContent,
        fullContent: content,
        size: data.size,
        sha: data.sha,
        lineRange: startLine && endLine ? { start: startLine, end: endLine } : null,
      };
    } catch (error) {
      console.error('[GitHub] Error reading file:', error);
      throw new Error(`Failed to read file ${filePath}: ${error.message}`);
    }
  }

  /**
   * Create a GitHub issue
   * @param {Object} issueData
   * @param {string} issueData.title - Issue title
   * @param {string} issueData.body - Issue description (supports Markdown)
   * @param {Array<string>} issueData.labels - Array of label names
   * @param {string} issueData.priority - Priority level (low, medium, high, critical)
   * @returns {Promise<Object>} Created issue data
   */
  async createGitHubIssue({ title, body, labels = [], priority = 'medium' }) {
    try {
      console.log(`[GitHub] Creating issue: ${title}`);
      
      // Add priority label
      const allLabels = [...new Set([...labels, `priority: ${priority}`, 'customer-reported'])];

      // Add metadata to the body
      const enhancedBody = `${body}\n\n---\n**Reported by**: Voice Bug Agent\n**Timestamp**: ${new Date().toISOString()}`;

      const { data } = await this.octokit.issues.create({
        owner: this.owner,
        repo: this.repo,
        title,
        body: enhancedBody,
        labels: allLabels,
      });

      console.log(`[GitHub] Issue created: #${data.number}`);

      return {
        number: data.number,
        url: data.html_url,
        title: data.title,
        state: data.state,
      };
    } catch (error) {
      console.error('[GitHub] Error creating issue:', error);
      throw new Error(`Failed to create GitHub issue: ${error.message}`);
    }
  }

  /**
   * Search for files matching a pattern
   * @param {string} query - Search query (filename or content)
   * @returns {Promise<Array>} Array of matching files
   */
  async searchFiles(query) {
    try {
      console.log(`[GitHub] Searching for: ${query}`);
      
      const { data } = await this.octokit.search.code({
        q: `${query} repo:${this.owner}/${this.repo}`,
      });

      return data.items.map(item => ({
        name: item.name,
        path: item.path,
        sha: item.sha,
        url: item.html_url,
      }));
    } catch (error) {
      console.error('[GitHub] Error searching files:', error);
      throw new Error(`Failed to search files: ${error.message}`);
    }
  }
}

// Singleton instance
const githubService = new GitHubService();

export default githubService;
