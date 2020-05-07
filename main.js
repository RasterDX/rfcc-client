// window.onload = function() {
//     this.loadHome();
//     bootstrapWeb3(async (web3, err) => {
//         if (err) {
//             const contentWrapper = document.getElementById('content-wrapper');
//             fetch('error.html')
//             .then(response => response.text())
//             .then(data => {
//                 this.console.log(data);
//                 contentWrapper.innerHTML = data;
//             })
//             .catch(error => console.error(error));
//         }
//             console.log("ho")

//             loadHome();
//             const accounts = await web3.eth.getAccounts();
//             const tokenAddress = '0x80eD4A82c37034965285D6E052914De7A28641fb';
//             web3.eth.getBalance(tokenAddress, function (error, result) {
//                 console.log('Ether:', web3.utils.fromWei(result, 'ether'));
//             });
//             console.log(accounts);
        
//     });
// }

let abi = [{"inputs":[{"internalType":"uint256","name":"total","type":"uint256"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"tokenOwner","type":"address"},{"indexed":true,"internalType":"address","name":"spender","type":"address"},{"indexed":false,"internalType":"uint256","name":"tokens","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"tokens","type":"uint256"}],"name":"Transfer","type":"event"},{"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"tokenOwner","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"receiver","type":"address"},{"internalType":"uint256","name":"numTokens","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"delegate","type":"address"},{"internalType":"uint256","name":"numTokens","type":"uint256"}],"name":"approve","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"delegate","type":"address"}],"name":"allowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"buyer","type":"address"},{"internalType":"uint256","name":"numTokens","type":"uint256"}],"name":"transferFrom","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"}];

let account = '';
let balance;

window.addEventListener('load', async () => {
    // Modern dapp browsers...
    if (window.ethereum) {
        window.web3 = new Web3(ethereum);
        try {
            // Request account access if needed
            await ethereum.enable();
            console.log('here')
            // Acccounts now exposed
            account = await web3.eth.getAccounts();
            try {
                web3.eth.getBalance(account[0], function (error, wei) {
                    if (!error) {
                        balance = Number(web3.utils.fromWei(wei, 'ether'));
                        document.getElementById('balance-text').innerHTML = balance.toFixed(2) + ' ETH';
                    }
                });
            } catch (err) {
                console.error(err);
            }
            loadHome();
 
        } catch (error) {
            loadPage('error');
        }
    }
    // Legacy dapp browsers...
    else if (window.web3) {
        window.web3 = new Web3(web3.currentProvider);
        // Acccounts always exposed
        loadHome();
        web3.eth.sendTransaction({/* ... */});
    }
    // Non-dapp browsers...
    else {
        console.log('Non-Ethereum browser detected. You should consider trying MetaMask!');
        loadPage('error');
    }
});

function goToUpload() {
    fetch('upload.html')
        .then(response => response.text())
        .then(data => {
            this.console.log(data);
            document.getElementById('content-container').innerHTML = data;
        })
}

function uploadFile(file) {
    const client = new Erebos.swarm.SwarmClient({
        bzz: { url: 'https://swarm-gateways.net' },
    });
    client.bzz
        .uploadFile(file, { contentType: 'image/png' })
        .then(hash => client.bzz.download(hash))
        .then(res => res.text())
        .then(text => {
            console.log(text)
    })
}

function reloadPage() {
    window.location.reload();
}