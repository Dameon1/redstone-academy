import "../../src/App.css"
export const ArConnect = () => {
  window.addEventListener("arweaveWalletLoaded", (d) => {
    console.log(d)
  });
  const getPermission = async () => await window.arweaveWallet.connect(
    ['ACCESS_ADDRESS', "SIGN_TRANSACTION", "ACCESS_ALL_ADDRESSES", "ACCESS_PUBLIC_KEY", "SIGNATURE"]).then(data => console.log(data, "data"))
    .catch(err => console.log(err));
  //const currentAddress = async() => await window.arweaveWallet.getActiveAddress();

  const currentAddress = async () => await window.arweaveWallet.getActiveAddress()
    .then(data => console.log(data))
    .catch(err => console.log(err));

  return (
    <div className="arConnectContainer">
      <button onClick={() => getPermission()}>ArConnect</button>
      <br />
      <button onClick={() => currentAddress()}>
        LOG ADDR TO CONSOLE</button>
      <br />
      <button onClick={() => window.arweaveWallet.disconnect()}>
        Disconnect Wallet
      </button>
    </div>
  )
}



