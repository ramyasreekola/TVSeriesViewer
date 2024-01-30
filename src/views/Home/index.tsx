import SearchBar from "../../components/SearchBar";
import styles from "./Home.module.css";

const Home: React.FC<{
  onSearch: (searchTerm: string) => void;
}> = ({ onSearch }) => {
  return (
    <div className={styles.container}>
      <img src="/src/assets/tvmaze.png" alt="TVMaze Logo" />
      <SearchBar onSearch={onSearch} />
    </div>
  );
};

export default Home;
