// src/data/featuredCards.js
// 3. Sau này thay bằng backend siêu dễ:
// Chỉ cần đổi:

// js
// Sao chép
// Chỉnh sửa
//  Trước:
// setCards(featuredCards);

//  Sau:
// fetch("http://localhost:3000/api/featured")
//   .then((res) => res.json())
//   .then((data) => setCards(data));

import exampleImg from '@images/exampleMustReadDoc.png';

const featuredCards = [
    {
        id: 1,
        image: exampleImg,
        title: 'FOR INSTRUCTORS',
        description: 'TOTC’s school management software helps traditional and online schools manage scheduling.',
        discount: '50%',
    },
    {
        id: 2,
        image: exampleImg,
        title: 'FOR INSTRUCTORS',
        description: 'TOTC’s school management software helps traditional and online schools manage scheduling.',
        discount: '50%',
    },
    {
        id: 3,
        image: exampleImg,
        title: 'FOR INSTRUCTORS',
        description: 'TOTC’s school management software helps traditional and online schools manage scheduling.',
        discount: '50%',
    },
];

export default featuredCards;
