//{!status?styles.progress+' '+styles.rotate:styles.progress} fill={color}
export default function Progress({height, color, status}){
    return(
    <>
      <svg height={height} className={status?'':'animate-spin'} viewBox="0 0 1920 1920" xmlns="http://www.w3.org/2000/svg">
          <path d="M320.006 960.032c0 352.866 287.052 639.974 640.026 639.974 173.767 0 334.093-69.757 451.938-188.072l-211.928-211.912h480.019v479.981l-155.046-155.114C1377.649 1672.883 1177.24 1760 960.032 1760 518.814 1760 160 1401.134 160 960.032ZM959.968 160C1401.186 160 1760 518.866 1760 959.968h-160.006c0-352.866-287.052-639.974-640.026-639.974-173.767 0-334.093 69.757-451.938 188.072l211.928 211.912H239.94V239.997L394.985 395.03C542.351 247.117 742.76 160 959.968 160Z" fillRule="evenodd"/>
      </svg>
    </>
    )
}