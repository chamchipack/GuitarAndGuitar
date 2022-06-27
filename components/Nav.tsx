import Link from 'next/link'
import navStyles from '../styles/Nav.module.css'

const Nav = ():JSX.Element => {
    return (
        <nav className={navStyles.nav}>
                <Link href='/'>
                    <h2>CHECK IT</h2>
                </Link>
            <ul>
                <li>
                    <Link href='/listpage'>
                        <a>전체명단</a>
                    </Link>
                </li>
                <li>
                    <Link href='/days'>
                        <a>요일별</a>
                    </Link>
                </li>
                <li>
                    <Link href='/statics'>
                        <a>통계</a>
                    </Link>
                </li>
                <li>
                    <Link href='/register'>
                        <a>인원 등록</a>
                    </Link>
                </li>
            </ul>
        </nav>
    )
}
export default Nav