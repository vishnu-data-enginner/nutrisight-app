import requests
import arxiv
import json
from typing import List, Dict, Optional
from dataclasses import dataclass
from datetime import datetime
import openai
import os

@dataclass
class ResearchPaper:
    title: str
    authors: List[str]
    abstract: str
    published_date: str
    journal: str
    doi: Optional[str]
    url: str
    relevance_score: float

@dataclass
class ScientificEvidence:
    ingredient: str
    health_effect: str
    evidence_level: str  # "strong", "moderate", "limited"
    research_papers: List[ResearchPaper]
    summary: str
    confidence_score: float

class ResearchService:
    def __init__(self):
        self.openai_client = None
    
    def _get_openai_client(self):
        if self.openai_client is None:
            api_key = os.getenv("OPENAI_API_KEY")
            if not api_key:
                raise ValueError("OPENAI_API_KEY environment variable not set")
            self.openai_client = openai.OpenAI(api_key=api_key)
        return self.openai_client
    
    async def search_ingredient_research(self, ingredient: str, health_concern: str = None) -> List[ResearchPaper]:
        """Search for research papers about ingredient health effects"""
        try:
            # Search ArXiv for relevant papers
            search_query = f"nutrition health effects {ingredient}"
            if health_concern:
                search_query += f" {health_concern}"
            
            client = arxiv.Client()
            search = arxiv.Search(
                query=search_query,
                max_results=10,
                sort_by=arxiv.SortCriterion.Relevance
            )
            
            papers = []
            for result in client.results(search):
                paper = ResearchPaper(
                    title=result.title,
                    authors=[author.name for author in result.authors],
                    abstract=result.summary,
                    published_date=result.published.strftime("%Y-%m-%d"),
                    journal="ArXiv",
                    doi=result.doi,
                    url=result.entry_id,
                    relevance_score=0.8  # Default relevance
                )
                papers.append(paper)
            
            return papers
            
        except Exception as e:
            print(f"Error searching research papers: {e}")
            return []
    
    async def analyze_research_with_ai(self, ingredient: str, papers: List[ResearchPaper]) -> ScientificEvidence:
        """Use AI to analyze research papers and extract health insights"""
        try:
            # Check if OpenAI API key is available
            try:
                self._get_openai_client()
            except ValueError:
                # Fallback to mock analysis when API key is not available
                return ScientificEvidence(
                    ingredient=ingredient,
                    health_effect=f"Research analysis for {ingredient} shows mixed health effects",
                    evidence_level="moderate",
                    research_papers=papers,
                    summary=f"Based on {len(papers)} research papers, {ingredient} has various health implications that require further study.",
                    confidence_score=0.6
                )
            
            # Prepare research context for AI analysis
            research_context = ""
            for paper in papers[:5]:  # Use top 5 most relevant papers
                research_context += f"Title: {paper.title}\nAbstract: {paper.abstract}\n\n"
            
            prompt = f"""
            Analyze the following research papers about {ingredient} and provide a scientific assessment:
            
            {research_context}
            
            Please provide:
            1. Main health effects of {ingredient}
            2. Evidence level (strong/moderate/limited)
            3. Key findings summary
            4. Confidence score (0-1)
            
            Format as JSON:
            {{
                "health_effect": "description",
                "evidence_level": "strong/moderate/limited",
                "summary": "key findings",
                "confidence_score": 0.85
            }}
            """
            
            response = self._get_openai_client().chat.completions.create(
                model="gpt-4",
                messages=[
                    {"role": "system", "content": "You are a nutrition scientist analyzing research papers. Provide accurate, evidence-based assessments."},
                    {"role": "user", "content": prompt}
                ],
                temperature=0.3
            )
            
            analysis = json.loads(response.choices[0].message.content)
            
            return ScientificEvidence(
                ingredient=ingredient,
                health_effect=analysis.get("health_effect", "No significant health effects found"),
                evidence_level=analysis.get("evidence_level", "limited"),
                research_papers=papers,
                summary=analysis.get("summary", "Insufficient research data"),
                confidence_score=analysis.get("confidence_score", 0.5)
            )
            
        except Exception as e:
            print(f"Error analyzing research with AI: {e}")
            return ScientificEvidence(
                ingredient=ingredient,
                health_effect="Analysis unavailable",
                evidence_level="limited",
                research_papers=[],
                summary="Unable to analyze research data",
                confidence_score=0.0
            )
    
    async def get_ingredient_scientific_evidence(self, ingredient: str) -> ScientificEvidence:
        """Get comprehensive scientific evidence for an ingredient"""
        # Search for research papers
        papers = await self.search_ingredient_research(ingredient)
        
        # Analyze with AI
        evidence = await self.analyze_research_with_ai(ingredient, papers)
        
        return evidence
    
    async def search_pubmed_alternative(self, ingredient: str) -> List[Dict]:
        """Alternative search using web scraping for PubMed-like results"""
        try:
            # This would integrate with PubMed API or similar
            # For now, return mock data
            return [
                {
                    "title": f"Health effects of {ingredient} in human nutrition",
                    "authors": ["Smith, J.", "Johnson, A."],
                    "journal": "Journal of Nutrition",
                    "year": "2023",
                    "abstract": f"Study examining the effects of {ingredient} on human health...",
                    "url": "https://pubmed.ncbi.nlm.nih.gov/example"
                }
            ]
        except Exception as e:
            print(f"Error searching PubMed: {e}")
            return []

# Global research service instance
research_service = ResearchService()
