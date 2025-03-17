/**
 * Mobile Responsiveness Verification Script
 * 
 * This script checks all pages for mobile responsiveness issues
 * and generates a report of potential problems.
 */

const fs = require('fs');
const path = require('path');
const { promisify } = require('util');
const readdir = promisify(fs.readdir);
const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);

// Configuration
const config = {
  // Directories to scan for React/Next.js components
  scanDirs: [
    path.join(__dirname, '..', 'src', 'app'),
    path.join(__dirname, '..', 'src', 'components'),
    path.join(__dirname, '..', 'src', 'sections'),
  ],
  // Extensions to process
  extensions: ['.tsx', '.jsx', '.js', '.ts'],
  // Output file path
  outputPath: path.join(__dirname, '..', 'mobile-audit-report.md'),
  // Patterns to check for
  patterns: {
    // Positive patterns (good mobile practices)
    positive: [
      { regex: /className="[^"]*(?:sm:|md:|lg:|xl:)[^"]*"/g, description: 'Responsive Tailwind classes' },
      { regex: /flex(?:-col)?-(?:row|col)@/g, description: 'Flex direction changes on breakpoints' },
      { regex: /useMediaQuery|useBreakpoint/g, description: 'React responsive hooks' },
    ],
    // Negative patterns (potential issues)
    negative: [
      { 
        regex: /width:\s*\d+px/g, 
        description: 'Fixed width in pixels',
        // Don't flag if it's inside a media query
        exclusionRegex: /@media[^{]*\{[^}]*width:\s*\d+px/g
      },
      { 
        regex: /height:\s*\d+px/g, 
        description: 'Fixed height in pixels',
        // Don't flag if it's inside a media query
        exclusionRegex: /@media[^{]*\{[^}]*height:\s*\d+px/g
      },
      { 
        regex: /position:\s*absolute/g, 
        description: 'Absolute positioning (check mobile context)',
        // Exempt if it's in a component that handles responsiveness
        exclusionRegex: /useMediaQuery|useBreakpoint/g
      },
      { 
        regex: /text-\w+xl(?!\s|\/)/g, 
        description: 'Very large text without responsive classes',
        // Don't flag if there's a responsive class nearby
        exclusionRegex: /className="[^"]*(?:text-\w+\s+md:text-|md:text-)[^"]*"/g
      },
    ],
  }
};

// Utilities
async function scanDirectory(dir) {
  const files = [];
  
  // Read the directory entries
  const entries = await readdir(dir, { withFileTypes: true });
  
  // Process each entry
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    
    if (entry.isDirectory()) {
      // Recursively scan subdirectories
      const subDirFiles = await scanDirectory(fullPath);
      files.push(...subDirFiles);
    } else if (entry.isFile() && config.extensions.includes(path.extname(entry.name))) {
      // Add matching files
      files.push(fullPath);
    }
  }
  
  return files;
}

async function analyzeFile(filePath) {
  const content = await readFile(filePath, 'utf8');
  const results = {
    file: path.relative(path.join(__dirname, '..'), filePath),
    responsive: [],
    issues: [],
  };
  
  // Check for positive patterns (good practices)
  for (const pattern of config.patterns.positive) {
    const matches = content.match(pattern.regex);
    if (matches && matches.length > 0) {
      results.responsive.push({
        type: pattern.description,
        count: matches.length,
      });
    }
  }
  
  // Check for negative patterns (potential issues)
  for (const pattern of config.patterns.negative) {
    const matches = content.match(pattern.regex);
    if (matches && matches.length > 0) {
      // Check if exclusion regex applies to the whole file
      if (pattern.exclusionRegex && content.match(pattern.exclusionRegex)) {
        continue;
      }
      
      // Find actual matching lines (which also checks for contextual exclusions)
      const matchingLines = findMatchingLines(content, pattern.regex, pattern.exclusionRegex);
      
      // Only add to issues if there are matching lines after exclusions
      if (matchingLines.length > 0) {
        results.issues.push({
          type: pattern.description,
          count: matchingLines.length,
          lines: matchingLines,
        });
      }
    }
  }
  
  return results;
}

function findMatchingLines(content, regex, exclusionRegex) {
  const lines = content.split('\n');
  const matchingLines = [];
  
  for (let i = 0; i < lines.length; i++) {
    if (regex.test(lines[i])) {
      // If there's an exclusion regex, check the surrounding context
      if (exclusionRegex) {
        // Look at 3 lines before and after for context
        const startIdx = Math.max(0, i - 3);
        const endIdx = Math.min(lines.length - 1, i + 3);
        const context = lines.slice(startIdx, endIdx + 1).join('\n');
        
        // Skip if exclusion pattern is found in context
        if (exclusionRegex.test(context)) {
          // Reset regex state for the next iteration
          regex.lastIndex = 0;
          continue;
        }
      }
      
      matchingLines.push({
        line: i + 1,
        content: lines[i].trim(),
      });
    }
    // Reset regex state for the next iteration
    regex.lastIndex = 0;
  }
  
  return matchingLines;
}

async function generateReport(results) {
  let markdown = `# VitalPredict AI Mobile Responsiveness Audit\n\n`;
  markdown += `*Generated on ${new Date().toLocaleDateString()}*\n\n`;
  
  // Summary statistics
  const totalFiles = results.length;
  const filesWithIssues = results.filter(r => r.issues.length > 0).length;
  const totalIssues = results.reduce((sum, r) => sum + r.issues.reduce((s, i) => s + i.count, 0), 0);
  
  markdown += `## Summary\n\n`;
  markdown += `- **Total files analyzed:** ${totalFiles}\n`;
  markdown += `- **Files with potential issues:** ${filesWithIssues}\n`;
  markdown += `- **Total potential issues:** ${totalIssues}\n\n`;
  
  // Files with issues
  if (filesWithIssues > 0) {
    markdown += `## Files with Potential Issues\n\n`;
    
    for (const result of results.filter(r => r.issues.length > 0)) {
      markdown += `### ${result.file}\n\n`;
      
      for (const issue of result.issues) {
        markdown += `#### ${issue.type} (${issue.count} occurrences)\n\n`;
        
        markdown += `\`\`\`\n`;
        for (const line of issue.lines.slice(0, 5)) {
          markdown += `Line ${line.line}: ${line.content}\n`;
        }
        if (issue.lines.length > 5) {
          markdown += `... and ${issue.lines.length - 5} more\n`;
        }
        markdown += `\`\`\`\n\n`;
      }
    }
  }
  
  // Add recommendations
  markdown += `## Recommendations\n\n`;
  markdown += `1. **Verify all fixed dimensions:** Replace fixed pixel widths/heights with fluid percentages or viewport units\n`;
  markdown += `2. **Check absolute positioning:** Ensure absolute positioned elements work on small screens\n`;
  markdown += `3. **Optimize text sizes:** Add responsive text classes for all headings\n`;
  markdown += `4. **Test touch targets:** Ensure all buttons and links are at least 44x44px on mobile\n`;
  markdown += `5. **Test on real devices:** Confirm functionality on actual mobile devices\n`;
  
  return markdown;
}

// Main function
async function main() {
  try {
    console.log('Starting mobile responsiveness verification...');
    
    // Collect all files to analyze
    let allFiles = [];
    for (const dir of config.scanDirs) {
      const files = await scanDirectory(dir);
      allFiles = [...allFiles, ...files];
    }
    
    console.log(`Found ${allFiles.length} files to analyze`);
    
    // Analyze each file
    const results = [];
    for (const file of allFiles) {
      const result = await analyzeFile(file);
      if (result.responsive.length > 0 || result.issues.length > 0) {
        results.push(result);
      }
      process.stdout.write('.');
    }
    console.log('\nAnalysis complete!');
    
    // Generate and save report
    const report = await generateReport(results);
    await writeFile(config.outputPath, report);
    
    console.log(`Report saved to ${config.outputPath}`);
  } catch (error) {
    console.error('Error:', error);
  }
}

// Run the script
main();
