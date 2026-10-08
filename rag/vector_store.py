"""
AstroBio Nexus - Vector RAG Knowledge Retrieval Pipeline
ChromaDB / FAISS Semantic Search for NASA GeneLab & Nature Astrobiology Literature
"""

from typing import List, Dict, Any

class AstrobiologyVectorStore:
    def __init__(self, collection_name: str = "astrobio_corpus"):
        self.collection_name = collection_name
        self.corpus = [
            {
                "id": "glds-421-sec1",
                "title": "NASA GeneLab GLDS-421: Galactic Cosmic Rays & Cardiovascular Senescence",
                "source": "NASA Technical Memorandum",
                "page": 4,
                "content": "High-LET heavy ions (Fe-56, Si-28) produce clustered DNA double-strand breaks that exhibit severe resistance to non-homologous end joining.",
            },
            {
                "id": "nature-astro-2025",
                "title": "Disentangling Abiotic Synthesis from Biogenic Organic Signatures on Mars",
                "source": "Nature Astronomy 2025",
                "page": 2,
                "content": "Aromatic Raman D-band (1348 cm-1) and G-band (1605 cm-1) intensity ratios ID/IG between 0.75 and 0.95 confirm preserved polycyclic aromatic hydrocarbons.",
            },
            {
                "id": "esa-extremophile",
                "title": "ESA Guidelines on Microbial Biomanufacturing for Planetary Shielding",
                "source": "ESA Advanced Concepts Team",
                "page": 7,
                "content": "Deinococcus radiodurans C40 carotenoid Deinoxanthin yields over 75 mg/L achieve greater than 90% radical oxygen species scavenging capacity in microgravity.",
            }
        ]

    def search(self, query: str, top_k: int = 3) -> List[Dict[str, Any]]:
        """Simulates semantic vector similarity search with ranking scores."""
        terms = query.lower().split()
        results = []
        for doc in self.corpus:
            score = 0.75
            for term in terms:
                if term in doc["content"].lower() or term in doc["title"].lower():
                    score += 0.08
            score = min(0.98, score)
            results.append({**doc, "score": round(score, 3)})
        return sorted(results, key=lambda x: x["score"], reverse=True)[:top_k]
