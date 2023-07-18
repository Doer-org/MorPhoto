import Link from "next/link";

const Page = () => {
  return (
    <>
      <h2>Result Page</h2>
      <div>
        <span>元画像</span>
        <div>
          <img
            src="https://media.discordapp.net/attachments/1130117141228703824/1130117145217478737/result_0.png?width=500&height=560"
            alt=""
            width={160}
            height={160}
          />
        </div>
      </div>
      <div>
        <span>プロンプト</span>
        <p>花火大会</p>
      </div>
      <div>
        <span>結果画像</span>
        <div>
          <img
            src="https://media.discordapp.net/attachments/1126485571108360313/1130108343839621140/result.png?width=662&height=662"
            alt=""
            width={160}
            height={160}
          />
        </div>
      </div>
      <div>
        <ul>
          <li>
            <a href="">共有する</a>
          </li>
          <li>
            <Link href="/input">さらに画像を変化する</Link>
          </li>
          <li>
            <Link href="/timeline">タイムラインへ</Link>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Page;
