import styles from "../styles.module.scss";
import categoriesMenu  from "../constant";


function Categories() {
  const { categoriesContainer } = styles;
  return (
   <div className={categoriesContainer}>
     <section className={styles.categories}>
      <h2>Lựa chọn tài liệu yêu thích từ danh mục hàng đầu</h2>
      <div className={styles.grid}>
        {categoriesMenu.map((cat, idx) => (
          <div key={idx} className={styles.categoryCard}>
            <img src={cat.image} alt="" />
            <h3>{cat.title}</h3>
            <p>{cat.desc}</p>
          </div>
        ))}
      </div>
    </section>
   </div>
  );
}

export default Categories;


