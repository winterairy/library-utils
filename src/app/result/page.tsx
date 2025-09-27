import Container from "@/components/container";
import ResultContent from "@/components/result-content";

export default function Result() {
  return (
    <Container currentPage="result">
      <div className="m-2 font-[family-name:var(--font-noto-sans)]">
        <h1 className="text-5xl font-bold mt-3 mb-10 text-center">통계 결과</h1>
        <div className="max-w-2xl mx-auto">
          <ResultContent />
        </div>
      </div>
    </Container>
  );
}
