/**
 * AI Matcher & Semantic Screening Service
 * Handles resume parsing, entity extraction, weighted composite scoring,
 * skill gap analysis, and tailored interview question generation.
 */

// Skill synonym mapping for semantic equivalence
const SKILL_EQUIVALENCE = {
  'react': ['react.js', 'reactjs', 'next.js', 'redux'],
  'node.js': ['node', 'nodejs', 'express', 'express.js', 'nestjs'],
  'mongodb': ['mongo', 'nosql', 'mongoose', 'documentdb'],
  'postgresql': ['postgres', 'sql', 'rdbms', 'mysql', 'relational database'],
  'python': ['fastapi', 'flask', 'django', 'pandas', 'numpy'],
  'aws': ['amazon web services', 'cloud', 'gcp', 'azure', 'serverless'],
  'docker': ['containers', 'containerization', 'kubernetes', 'k8s'],
  'typescript': ['ts', 'javascript', 'es6'],
  'graphql': ['rest api', 'api design', 'apollo'],
  'machine learning': ['ml', 'deep learning', 'pytorch', 'tensorflow', 'nlp', 'llm']
};

class AIMatcherService {
  /**
   * Redact PII (Personally Identifiable Information) for unbiased screening
   */
  static anonymizeResume(text) {
    let sanitized = text;
    // Mask emails
    sanitized = sanitized.replace(/[\w.-]+@[\w.-]+\.\w+/gi, '[REDACTED_EMAIL]');
    // Mask phone numbers
    sanitized = sanitized.replace(/(\+?\d{1,3}[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/g, '[REDACTED_PHONE]');
    // Mask social URLs
    sanitized = sanitized.replace(/https?:\/\/(www\.)?(linkedin|github|twitter)\.com\/[A-Za-z0-9_-]+/gi, '[REDACTED_PROFILE]');
    return sanitized;
  }

  /**
   * Extract skills by scanning text against known dictionary + synonym map
   */
  static extractSkills(resumeText) {
    const textLower = resumeText.toLowerCase();
    const foundSkills = new Set();

    Object.keys(SKILL_EQUIVALENCE).forEach(skill => {
      if (textLower.includes(skill)) {
        foundSkills.add(skill);
      }
      // Check synonyms
      SKILL_EQUIVALENCE[skill].forEach(syn => {
        if (textLower.includes(syn)) {
          foundSkills.add(skill);
          foundSkills.add(syn);
        }
      });
    });

    // Also detect common general terms
    const additionalTerms = ['git', 'ci/cd', 'agile', 'scrum', 'system design', 'microservices', 'redis', 'kafka', 'tailwind'];
    additionalTerms.forEach(term => {
      if (textLower.includes(term)) foundSkills.add(term);
    });

    return Array.from(foundSkills);
  }

  /**
   * Calculate semantic match score between candidate and job requisition
   */
  static evaluateMatch(candidate, job) {
    const candidateSkills = (candidate.extractedSkills || []).map(s => (typeof s === 'string' ? s : s.name).toLowerCase());
    const requiredSkills = (job.requiredSkills || []).map(s => s.toLowerCase());
    const candidateExp = candidate.experienceYears || 0;
    const requiredExp = job.minExperienceYears || 1;

    // 1. Skills Matching (45% weight)
    const matchedSkills = [];
    const missingSkills = [];

    requiredSkills.forEach(req => {
      let isMatched = candidateSkills.includes(req);
      if (!isMatched && SKILL_EQUIVALENCE[req]) {
        // Check if candidate has an equivalent skill
        isMatched = SKILL_EQUIVALENCE[req].some(syn => candidateSkills.includes(syn));
      }

      if (isMatched) {
        matchedSkills.push(req);
      } else {
        missingSkills.push(req);
      }
    });

    const skillScore = requiredSkills.length > 0 
      ? Math.round((matchedSkills.length / requiredSkills.length) * 100) 
      : 80;

    // 2. Experience Fit (30% weight)
    let experienceScore = 100;
    if (candidateExp < requiredExp) {
      const expRatio = candidateExp / requiredExp;
      experienceScore = Math.max(30, Math.round(expRatio * 90));
    } else {
      experienceScore = Math.min(100, 85 + Math.min(15, (candidateExp - requiredExp) * 5));
    }

    // 3. Domain & Preferred Skills (15% weight)
    let domainScore = 80;
    const preferredSkills = (job.preferredSkills || []).map(s => s.toLowerCase());
    if (preferredSkills.length > 0) {
      const matchedPreferred = preferredSkills.filter(ps => candidateSkills.includes(ps));
      domainScore = Math.round((matchedPreferred.length / preferredSkills.length) * 100);
    }

    // 4. Education & Stability (10% weight)
    const educationScore = candidate.education?.degree ? 90 : 75;

    // Composite Weighted Score
    const overallScore = Math.round(
      (skillScore * 0.45) +
      (experienceScore * 0.30) +
      (domainScore * 0.15) +
      (educationScore * 0.10)
    );

    // AI Summary Rationale
    let rationale = '';
    if (overallScore >= 85) {
      rationale = `Exceptional fit for ${job.title}. Candidate demonstrates mastery of ${matchedSkills.slice(0, 3).join(', ')} with ${candidateExp} years of hands-on experience, exceeding the required baseline.`;
    } else if (overallScore >= 70) {
      rationale = `Solid candidate with strong foundation in ${matchedSkills.slice(0, 2).join(', ')}. Has minor gaps in ${missingSkills.slice(0, 2).join(', ') || 'specialized tools'}, but exhibits strong transferable engineering skills.`;
    } else {
      rationale = `Potential mismatch. Candidate lacks critical requirements: ${missingSkills.join(', ')} and falls short of the ${requiredExp} year threshold for this seniority.`;
    }

    // Tailored questions based on gaps
    const questions = [];
    if (missingSkills.length > 0) {
      questions.push(`Can you explain your experience transitioning into ${missingSkills[0]}, or how you've worked with comparable technologies?`);
    }
    if (candidateExp < requiredExp) {
      questions.push(`This role requires high autonomy. Can you share an example of a high-impact architectural decision you spearheaded independently?`);
    } else {
      questions.push(`Given your deep background with ${matchedSkills[0] || 'your core stack'}, how would you architect high availability and low latency in our environment?`);
    }
    questions.push(`Describe a time where you managed technical debt under tight production deadlines.`);

    return {
      overall: Math.min(99, Math.max(15, overallScore)),
      skillsMatchPct: skillScore,
      experienceMatchPct: experienceScore,
      domainMatchPct: domainScore,
      matchedSkills,
      missingSkills,
      aiSummaryRationale: rationale,
      recommendedQuestions: questions
    };
  }
}

module.exports = AIMatcherService;
