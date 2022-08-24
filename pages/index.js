import Head from "next/head";
import Image from "next/image";
import { useState, useEffect } from "react";
import styles from "../styles/Home.module.css";
import { useRouter } from 'next/router'

export default function Home({ shuffledData, rawData }) {
  const router = useRouter()
  let [number, setNumber] = useState(1);

  function restart(){
    if(number === 1){
      return
    } else {
      const userInteraction = window.confirm("¿Quieres reiniciar?")
      const userLeaves = window.on
      if(userInteraction){
        Object.values(
          document.querySelectorAll("#checkbox")
        ).forEach((checkbox) => (checkbox.textContent = ""));
        setNumber(1);
      } else {
        return
      }
    }
  }

  return (
    <>
      <div className={styles.floatingReload} onClick={() => restart()}>
        <p>
          <span>{number-1}</span>/<span>{shuffledData.length}</span>
        </p>
        <p>Reiniciar</p>
      </div>
      <div className={styles.buttonsContainer}>
        <button className={styles.evelin} onClick={() => router.push('/evelin')}>
          Evelin
        </button>
        <button className={styles.leo} onClick={() => router.push('/leo')}>Leo</button>
        <button className={styles.ismael} onClick={() => router.push('/ismael')}>Ismael</button>
      </div>
      <div key={number.id}>
        {shuffledData &&
          shuffledData.map((sentence) => {
            return (
              <div key={sentence.id} className={styles.container}>
                <span
                  key={sentence.id}
                  className={styles.checkbox}
                  onClick={(e) => {
                    const checkbox = e.target.firstChild;
                    if (
                      Number(checkbox.textContent) !== 0 &&
                      Number(checkbox.textContent) < number
                    ) {
                      return;
                    } else {
                      const checkedSentence =
                        e.target.parentElement.children[1].innerText;
                      const sentenceToCompare = number - 1;
                      if (checkedSentence === rawData[sentenceToCompare]) {
                        checkbox.textContent = number;
                        setNumber((number += 1));
                      } else {
                        console.log("o");
                        document.body.classList.add("error");
                        setTimeout(() => {
                          document.body.classList.remove("error");
                        }, 50);
                      }
                    }
                  }}
                >
                  <p key={sentence.id} id="checkbox"></p>
                </span>
                <p key={sentence.id}>{sentence}</p>
              </div>
            );
          })}
      </div>
    </>
  );
}

export async function getServerSideProps(context) {
  const port = process.env.PORT || 3000;
  const response = await fetch(`http://localhost:${port}/api/sentences`);
  const data = await response.json();
  const rawData = Object.values(data)[0];
  const dataToShuffle = rawData.slice();
  // console.log(dataToShuffle);
  const shuffledData = dataToShuffle.sort((a, b) => {
    a = a.length;
    b = b.length;
    return 0.5 - Math.random();
  });
  console.log(rawData);

  return {
    props: {
      rawData,
      shuffledData,
    },
  };
}
