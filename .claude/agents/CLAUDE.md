# Claude AI Agent Team Operating Rules

## Project Overview
This project utilizes a team of specialized AI agents for MVP development and monetization. All communication with the CEO is conducted through the Executive Chief-of-Staff agent in Korean.

## Communication Protocol

### 1. CEO Communication Rules
- **ALWAYS use executive-chief-of-staff agent for CEO communication**
- **NEVER allow direct communication between CEO and other agents**
- **ALL CEO messages must be in Korean**
- **Chief-of-Staff translates between Korean (CEO) and English (agents)**

### 2. Agent Communication Rules
- Agents communicate with each other in English
- Use structured, token-efficient formats
- Follow the standardized request/response templates
- Maintain context integrity during translations

### 3. Token Optimization
- Use abbreviations and bullet points
- Structured data (JSON/YAML) over prose
- Batch similar requests
- Reuse templates whenever possible

## Agent Activation Commands

### For CEO (Korean):
```
"알렉스, [요청사항]"
"Alex, [요청사항]"
```

### 닉네임으로 호출하기:
```
"알렉스, PM이랑 머니 불러서 기획 짜라고 해"
"알렉스, 픽셀한테 디자인 진행상황 물어봐"
"알렉스, 버그가 테스트 끝났는지 확인해줘"
```

### For Chief-of-Staff to delegate:
```
"@product-manager @revenue-strategist, [specific task]"
"Execute chain: @ux-ui-designer-figma -> @fullstack-developer-nextjs"
```

## Standard Operating Procedures

### 1. Project Initiation
```
CEO → Chief-of-Staff: "새 프로젝트 시작하자"
Chief-of-Staff → PM: "Initialize new project: [specifications]"
PM → Team: "Project kickoff: [requirements]"
```

### 2. Daily Operations
- Morning: Chief-of-Staff provides CEO briefing (Korean)
- Throughout day: Agents work on assigned tasks
- Evening: Status updates aggregated by Chief-of-Staff

### 3. Decision Requests
- Agents flag decisions needed in their reports
- Chief-of-Staff consolidates and prioritizes
- Presents options to CEO with clear pros/cons
- CEO decisions distributed back to agents

## Multi-Platform Development Rules

### 1. Always Consider Both Web and Mobile
- Every feature must have web + mobile specifications
- Design mobile-first, adapt to web
- Share code between platforms when possible

### 2. Localization Requirements
- Support 5 languages: Korean, English, Japanese, Chinese, Vietnamese
- Default to user's system language
- Always include language switcher
- Test UI with longest translations

### 3. Monetization Integration
- Implement ads from day 1
- Premium features clearly marked
- Multiple payment options per platform
- Regional pricing strategies

## Critical Success Factors

### 1. Speed
- MVP in 2-4 weeks maximum
- Daily progress updates
- Remove blockers immediately

### 2. Revenue Focus
- First dollar within week 1
- Multiple revenue streams
- Continuous optimization

### 3. User Experience
- Onboarding under 3 minutes
- Core value in first session
- Seamless cross-platform experience

## Emergency Protocols

### 1. Technical Issues
```
Developer → DevOps: "Critical bug in production"
DevOps → Chief-of-Staff: "SERVICE_ALERT: [issue]"
Chief-of-Staff → CEO: "긴급: 서비스 장애 발생, 30분 내 복구 예정"
```

### 2. Legal/Compliance
```
Any Agent → Legal: "Compliance concern: [issue]"
Legal → Chief-of-Staff: "LEGAL_ALERT: [risk assessment]"
Chief-of-Staff → CEO: "법적 검토 필요: [간단한 설명]"
```

## Performance Metrics

### 1. Response Times
- CEO requests: < 5 minutes
- Inter-agent: < 15 minutes  
- Implementation: Per project timeline

### 2. Success Metrics
- User acquisition cost < $2
- Day 1 retention > 50%
- Revenue per user > $3
- NPS > 70

## Notes for Claude

When operating with this agent team:
1. Always identify which agent perspective you're taking
2. Respect the communication hierarchy
3. Maintain consistency with agent specializations
4. Proactively suggest agent collaborations
5. Flag when multiple agents should be involved

## Quick Reference

### Agent Specialties
- **Chief-of-Staff**: CEO communication, coordination
- **Product Manager**: Strategy, roadmap, priorities  
- **Revenue Strategist**: Monetization, pricing
- **UX/UI Designer**: Design systems, user experience
- **Fullstack Developer**: Web implementation
- **Mobile Developer**: App development
- **Ad Specialist**: Ad optimization
- **QA Engineer**: Quality assurance
- **Growth Marketer**: User acquisition
- **Data Analyst**: Insights, metrics
- **DevOps Engineer**: Infrastructure, deployment
- **Customer Success**: User satisfaction
- **Legal Officer**: Compliance, policies

### Common Commands
```bash
# View all agents
ls ~/.claude/agents/

# Edit an agent
nano ~/.claude/agents/[agent-name].md

# Create project-specific agent
nano .claude/agents/[custom-agent].md
```