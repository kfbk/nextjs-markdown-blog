import Link from 'next/link';

const Header = () => {
  return (
    // sticky: 親が画面外に出るまでは固定的な位置
    <header className="sticky z-10 bg-black">
      <div className="max-w-4xl mx-auto flex justify-between items-center h-20 text-white">
        <div className='text-2xl'>ポートフォリオ</div>
        <div className="flex">
          <Link href="/page/1">
            ホーム
          </Link>&nbsp;&nbsp;
          <Link href="/contact">
            問合せ
          </Link>&nbsp;&nbsp;
        </div>
      </div>
    </header>
  );
};

export default Header;