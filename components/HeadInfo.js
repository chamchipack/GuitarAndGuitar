import Head from "next/head";

const HeadInfo = ({title}) => {
    return(
        <Head>
            <title>{title}</title>
        </Head>
    )
}

HeadInfo.defaultProps = {
    title : 'Guitar&Guitar'
}
export default HeadInfo