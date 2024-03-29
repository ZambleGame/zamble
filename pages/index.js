import { useEffect, useState } from "react";
import Head from "next/head";
import Image from "next/image";
import { useMetamask } from "use-metamask";
import { FaDna, FaRobot, FaInfinity } from "react-icons/fa";
import Web3 from "web3";
import styles from "../styles/Home.module.scss";
import ProposalContract from "../contracts/Proposal";
import Eth from "ethjs-query"
import EthContract from "ethjs-contract"


export default function Home() {
  const { connect, metaState } = useMetamask();
  const [balance, setBalance] = useState();
  const [onh, setOnh] = useState(false);
  const [onnet, setOnnet] = useState("Harmony Testnet");
  const [votes, setVotes] = useState();

  useEffect(() => {
    if (!metaState.isConnected) {
      (async () => {
        try {
          await connect(Web3);
          await window.ethereum.enable();
        } catch (error) {
          console.log(error);
        }
      })();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    // gameLogic()
    // function genDivs(v) {
    //   const e = document.getElementById("gameBoard");
    //   console.log(e)
    //   for (let i = 0; i < v; i++) {
    //     let row = document.createElement("div");
    //     row.className = "row";
    //     for (let x = 1; x <= v; x++) {
    //       let cell = document.createElement("div");
    //       cell.className = "gridSquare";
    //       row.appendChild(cell);
    //     }
    //     e.appendChild(row);
    //   }
    // }
    // genDivs(6);
  });

  useEffect(() => {
    const { account, isConnected, web3 } = metaState;
    if (account.length && isConnected && web3) {
      (async () => {
        let _balance;
        let _onh;
        let _onnet;
        if (web3?.eth) {
          _balance = await metaState.web3.eth.getBalance(metaState.account[0]);
        } else {
          _balance = await metaState.web3.getBalance(metaState.account[0]);
        }
        const harmonyShards = [1666600000, 1666600001, 1666600002, 1666600003, 1666700000, 1666700001, 1666700002, 1666700003]
        const mainnetShards = [1666600000, 1666600001, 1666600002, 1666600003]
        if (harmonyShards.indexOf(parseInt(metaState.chain.id)) != -1) {
          _onh = true;
          setOnh(true);
          console.log(_onh);
          if (mainnetShards.indexOf(parseInt(metaState.chain.id)) != -1) {
            _onnet = "Harmony Mainnet";
            setOnnet("Harmony Mainnet");
          }
          else {
            _onnet = "Harmony Testnet";
            setOnnet("Harmony Testnet");
          }
        }
        else {
          _onh = false;
          setOnh(false)
        }
        setBalance(parseFloat(_balance / 10 ** 18).toFixed(3));
        function startApp(web3) {
          const eth = new Eth(web3.currentProvider);
          const contract = new EthContract(eth);
          initContract(contract);
        }
        const address = "0xe7a24f6d77b8a9d939a1e11dfb9a05ad347d2bbd"
        function initContract(contract) {
          const MiniToken = contract(ProposalContract["abi"]);
          const miniToken = MiniToken.at(address);
          console.log(miniToken)
          if (onh) {
            listenForClicks(miniToken);
          }
          return
        }
        function listenForClicks(miniToken) {
          const btns = document.querySelectorAll('.Home_gridSquare__f05MN')
          console.log(btns)
          btns.forEach(button => {
            button.addEventListener('click', event => {
              button.classList.add('Home_clickedGridSquare__65IN0')
              console.log(button.id)
              console.log(styles)
              return miniToken.vote(parseInt(button.id), { from: metaState.account[0] }).then(function (txHash) {
                console.log('Transaction sent')
                console.dir(txHash)
                waitForTxToBeMined(txHash)
              }).catch(console.error)
            });

          });
        }
        function getClickedSquares() {
          return document.querySelectorAll('.Home_clickedGridSquare__65IN0');
        }
        startApp(web3);
        async function waitForTxToBeMined(txHash) {
          let txReceipt;
          while (!txReceipt) {
            try { txReceipt = await Eth.getTransactionReceipt(txHash) }
            catch (err) { return console.log(err) }
          }
          indicateSuccess()
        }
      })();
    }
  }, [metaState, onh]);

  const [className, setClassName] = useState("")

  return (
    <div className={styles.container}>
      <Head>
        <title>Zamble</title>
        <meta name="title" content="Mint to Vote" />
        <meta name="description" content="Voting should be easy, transparent, trustless and effecient. With a unique Blockchain based Mint to Vote system...we’re here to do just that." />
        <link rel="icon" href="/logo.svg" />
        <meta name="theme-color" content="#c4a7e7" />
        <meta charset="UTF-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Mint to Vote" />
        <meta property="og:image" content="https://cdn.discordapp.com/attachments/923361968969121833/931078558921674822/Mint_To_Vote_1.png" />
        <meta property="og:description" content="Voting should be easy, transparent, trustless and effecient. With a unique Blockchain based Mint to Vote system...we’re here to do just that." />
        <meta property="og:url" content="https://minttovote.vercel.app/" />
        <meta property="og:locale" content="en_US" />
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:title" content="Mint to Vote" />
        <meta property="twitter:description" content="Voting should be easy, transparent, trustless and effecient. With a unique Blockchain based Mint to Vote system...we’re here to do just that." />
        <meta property="twitter:image" content="https://cdn.discordapp.com/attachments/923361968969121833/931078558921674822/Mint_To_Vote_1.png" />
      </Head>

      <main className={styles.main}>
        <img src="/logo.svg" height="100rem" alt="Zamble" />
        <h2>Zamble</h2>
        {onh ? (
          <p className={styles.description}>
            Đapp connected to the {" "}
            <code className={styles.code}>
              {onnet}
            </code> on the wallet{""}
            <code className={styles.code}>{metaState.account[0]}</code>
            {/* options are {""}
            <code className={styles.code}>{votes}</code> */}
          </p>
        ) : (
          <p className={styles.description}>
            <b>Not connected to HarmonyOne&apos;s<br />testnet via MetaMask.</b><br />Let&apos;s fix that!<br />
            <ol>
              <li><p>Make sure <a href="https://metamask.io/download">MetaMask</a> is installed</p></li>
              <li><p><a href="/metamask-harmony">Add HarmonyOne&apos;s testnet <Image src="/harmonyone.svg" alt="GitHub Logo" width={32} height={16} /></a></p></li>
              <li><p>Click the MetaMask extension
                <Image src="/metamask.svg" alt="GitHub Logo" width={32} height={16} />
              </p></li>
            </ol>
          </p>
        )}
        {onh ? (
          <div className={styles.gameBoard} id="gameBoard">
            <div className={styles.gridSquare} id="1"></div>
            <div className={styles.gridSquare} id="2"></div>
            <div className={styles.gridSquare} id="3"></div>
            <div className={styles.gridSquare} id="4"></div>
            <div className={styles.gridSquare} id="5"></div>
            <div className={styles.gridSquare} id="6"></div>
            <br />
            <div className={styles.gridSquare} id="7"></div>
            <div className={styles.gridSquare} id="8"></div>
            <div className={styles.gridSquare} id="9"></div>
            <div className={styles.gridSquare} id="10"></div>
            <div className={styles.gridSquare} id="11"></div>
            <div className={styles.gridSquare} id="12"></div>
            <br />
            <div className={styles.gridSquare} id="13"></div>
            <div className={styles.gridSquare} id="14"></div>
            <div className={styles.gridSquare} id="15"></div>
            <div className={styles.gridSquare} id="16"></div>
            <div className={styles.gridSquare} id="17"></div>
            <div className={styles.gridSquare} id="18"></div>
            <br />
            <div className={styles.gridSquare} id="19"></div>
            <div className={styles.gridSquare} id="20"></div>
            <div className={styles.gridSquare} id="21"></div>
            <div className={styles.gridSquare} id="22"></div>
            <div className={styles.gridSquare} id="23"></div>
            <div className={styles.gridSquare} id="24"></div>
            <br />
            <div className={styles.gridSquare} id="25"></div>
            <div className={styles.gridSquare} id="26"></div>
            <div className={styles.gridSquare} id="27"></div>
            <div className={styles.gridSquare} id="28"></div>
            <div className={styles.gridSquare} id="29"></div>
            <div className={styles.gridSquare} id="30"></div>
            <br />
            <div className={styles.gridSquare} id="31"></div>
            <div className={styles.gridSquare} id="32"></div>
            <div className={styles.gridSquare} id="33"></div>
            <div className={styles.gridSquare} id="34"></div>
            <div className={styles.gridSquare} id="35"></div>
            <div className={styles.gridSquare} id="36"></div>
            <br />
            <div className={styles.skipButton} id="0">Skip</div>
          </div>
        ) : (<div></div>)}
      </main>

      <footer className={styles.footer}>
        <span>
          <a
            href="https://github.com/thatonecalculator/boat"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image src="/github.svg" alt="GitHub Logo" width={32} height={16} /></a>
        </span>
        Powered by{" "}
        <span className={styles.logo}>
          <a
            href="https://harmony.one"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image src="/harmony.svg" alt="Harmony Logo" width={72} height={16} /></a>
        </span>. Made by Sebu Eisaian and Kainoa Kanter.
      </footer>
    </div>
  );
}
