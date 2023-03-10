import { FC, RefObject, useContext } from "react";
import ThemeContext from "../../context/ThemeContext";
import "./style/pagination.css";

interface PaginationProps {
  page: number;
  maxPage: number | null;
  setPage: (value: number) => void;
  sectionCards: RefObject<HTMLElement>;
}
const Pagination: FC<PaginationProps> = ({
  page,
  maxPage,
  setPage,
  sectionCards,
}) => {
  const pageForBlock = 6;
  const currentBlock = Math.ceil(page / pageForBlock);
  const maxBlock = maxPage && Math.ceil(maxPage / pageForBlock);

  const arrPage = [];
  const initialPage = (currentBlock - 1) * pageForBlock + 1;
  const finalPage =
    maxPage && maxBlock === currentBlock
      ? maxPage
      : currentBlock * pageForBlock;

  for (let i = initialPage; i <= finalPage; i++) {
    arrPage.push(i);
  }
  const handlePage = (value: number) => {
    scrollTo({
      top: sectionCards.current?.offsetTop,
      behavior: "smooth",
    });
    setPage(value);
  };
  const handlePrevius = () => {
    if (page - 1 > 0) {
      setPage(page - 1);
    }
  };
  const handleNext = () => {
    if (!maxPage) return;
    if (page + 1 <= maxPage) {
      setPage(page + 1);
    }
  };

  const {isDark} = useContext(ThemeContext)
  return (
    <ul className="pagination__list">
      <li className={`pagination__item ${isDark && "pagination__item--dark"}`} onClick={handlePrevius}>
        {"<"}
      </li>
      {arrPage.map((pag) => (
        <li
          className={`pagination__item ${page === pag && "active"} ${isDark && "pagination__item--dark"}`}
          key={pag}
          onClick={() => handlePage(pag)}
        >
          {pag}
          <img className="pagination__img" src="/pokeball.svg" alt="pokeball" />
        </li>
      ))}
      <li className={`pagination__item ${isDark && "pagination__item--dark"}`} onClick={handleNext}>
        {">"}
      </li>
    </ul>
  );
};

export default Pagination;
