import Link from "next/link";

const Page = () => {
  return (
    <>
      <h2>Top Page</h2>
      <p>サービスの説明</p>
      <div>
        <ul>
          <li>
            <Link href="/input">画像を変換する</Link>
          </li>
          <li>
            <Link href="/morphoto">一覧ページへ</Link>
          </li>
        </ul>
      </div>
      <div>
        <span>変換例1</span>
        <div>
          <img src="/assets/example1.png" alt="" />
        </div>
      </div>
      <div>
        <span>変換例2</span>
        <div>
          <img src="/assets/example2.png" alt="" />
        </div>
      </div>
      <div>
        <span>変換例3</span>
        <div>
          <img src="/assets/example3.png" alt="" />
        </div>
      </div>
    </>
  );
};

export default Page;
