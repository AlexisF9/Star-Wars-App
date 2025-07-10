export function People({ data }: any) {
  console.log(data);
  return (
    <>
      <h2>{data.name}</h2>
    </>
  );
}
