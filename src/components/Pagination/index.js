import './index.css'

const Pagination = props => {
  const {data, pageNumber, changePageNumber, changePagesData} = props
  const pages = []

  for (let i = 1; Math.ceil(data.length / 10) + 1 > i; i += 1) {
    pages.push(i)
  }
  const previousPage = () => {
    if (pageNumber > 1) {
      changePageNumber(pageNumber - 1)
      changePagesData(pageNumber - 1)
    }
  }

  const nextPage = () => {
    if (pageNumber < pages.length) {
      changePageNumber(pageNumber + 1)
      changePagesData(pageNumber + 1)
    }
  }

  return (
    <div className="pagesBg">
      <div>
        <img
          className="buttonForPagination"
          onClick={previousPage}
          src="https://i.ibb.co/F419K3J/Icon.png"
          alt="Previous"
        />
      </div>

      <p className="pagesNumber">
        {pageNumber} of {pages.length}
      </p>
      <div>
        <img
          className="buttonForPagination"
          onClick={nextPage}
          src="https://i.ibb.co/DrD6Ss9/Icon.png"
          alt="nextPage"
        />
      </div>
    </div>
  )
}

export default Pagination
