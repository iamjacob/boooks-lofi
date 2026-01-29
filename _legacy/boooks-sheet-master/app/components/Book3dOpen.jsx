import OpenBook from './../[username]/Experience/OpenBook'

const DUMMY_BOOK = {
  id: "demo-book",
  title: "Demo Book",
  author: "Unknown",
  pages: 120,
  dimensions: [10, 16, 2],
  cover: {
      front :"./../blockchain/m/i/mit_liv_med_fangekoret-00000001/cover/front.webp",
      spine : "./../blockchain/m/i/mit_liv_med_fangekoret-00000001/cover/spine.webp",
      back : "./../blockchain/m/i/mit_liv_med_fangekoret-00000001/cover/back.webp"
   },
  pdf: "/sample.pdf",
};

const Book3dOpen = () => {
  return (<OpenBook
  book={DUMMY_BOOK}

/>)
}

export default Book3dOpen