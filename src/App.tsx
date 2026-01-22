import { useEffect, useState } from "react";
import AddRecord from "./components/AddRecordSection";
import RecordList from "./components/RecordListSection";
import Modal from "react-modal";
import Styles from "./App.module.css";
import AppProvider from "./AppProvider";


export interface IRecord {
  id: string | number;
  date: string;
  meal: string;
  food: string;
  calories: string | number;
}

const LOCAL_STORAGE_KEY = "calorieRecords";

function loadFromLocalStorage(key: string) {
  const data = key && localStorage.getItem(key);
  return data ? JSON.parse(data) : [];
}
function addToLocalStorage<T>(key: string, value: T) {
  localStorage.setItem(key, JSON.stringify(value));
}
function App() {
  const [recordList, setRecordList] = useState<IRecord[]>(() =>
    loadFromLocalStorage(LOCAL_STORAGE_KEY)
  );

  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    addToLocalStorage(LOCAL_STORAGE_KEY, recordList);
  }, [recordList]);

  const onSubmit = (record: IRecord) => {
    setRecordList([...recordList, record]);
    toggleModal();
  };

  const toggleModal = () => {
    setIsModalOpen((prev) => !prev);
  };

  return (
    <>
      <h1>Calorie Tracker🍎</h1>
      <AppProvider
      >
        <Modal
          isOpen={isModalOpen}
          onRequestClose={toggleModal}
          contentLabel="Add Calorie Record"
          className={Styles.formModal}
          overlayClassName={Styles.formOverlay}
        >
          <AddRecord onSubmit={onSubmit} toggleModal={toggleModal} />
        </Modal>
        <RecordList recordList={recordList} />
        <button onClick={toggleModal}>Track Food</button>
      </AppProvider>
    </>
  );
}

export default App;
