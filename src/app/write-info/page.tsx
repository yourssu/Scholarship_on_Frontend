export default function WriteInfoPage() {
  return (
    <div className="grid min-h-screen grid-rows-[20px_1fr_20px] items-center justify-items-center gap-16 p-8 pb-20 font-sans sm:p-20">
      정보 입력 - 정보 입력 후 넘어갈 때, 사용자가 입력한 정보를 로컬 스토리지에
      저장하고 쿼리스트링에 미리 지정한 값에 맞춰 넣어서 홈으로 리다리렉트 홈은
      각 url을 기반으로 데이터를 불러오고, 만약 url에 쿼리스트링이 없다면 로컬
      스토리지에 있는 값을 가져와서 다시 홈으로 리다이렉트 {`>`} 생각해보니까
      좋은 방식이 아닌듯... 논의 예정
    </div>
  );
}
