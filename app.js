
/* Agent Card Studio — mint NFT asli di BNB Chain (ERC-721 AgentCard). */
const AGENT_CARD_CONFIG = {
  contractAddress: "",
  chainId: 56,
  chainName: "BNB Smart Chain",
  explorer: "https://bscscan.com",
};

const AGENT_CARD_ABI = [{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"},{"indexed":false,"internalType":"string","name":"agentName","type":"string"},{"indexed":false,"internalType":"uint8","name":"style","type":"uint8"},{"indexed":false,"internalType":"uint8","name":"tier","type":"uint8"}],"name":"CardMinted","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"Transfer","type":"event"},{"inputs":[],"name":"MAX_SUPPLY","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"cards","outputs":[{"internalType":"string","name":"agentName","type":"string"},{"internalType":"uint8","name":"style","type":"uint8"},{"internalType":"string","name":"colorHex","type":"string"},{"internalType":"uint8","name":"tier","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"string","name":"agentName","type":"string"},{"internalType":"uint8","name":"style","type":"uint8"},{"internalType":"string","name":"colorHex","type":"string"}],"name":"freeMint","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"freeMintPrice","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"freeMintUsed","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"mintOpen","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"ownerOf","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"string","name":"agentName","type":"string"},{"internalType":"uint8","name":"style","type":"uint8"},{"internalType":"string","name":"colorHex","type":"string"}],"name":"paidMint","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"paidMintPrice","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"newPrice","type":"uint256"}],"name":"setFreeMintPrice","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bool","name":"open","type":"bool"}],"name":"setMintOpen","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"newPrice","type":"uint256"}],"name":"setPaidMintPrice","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"tokenURI","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalMinted","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"withdraw","outputs":[],"stateMutability":"nonpayable","type":"function"}];

const AGENT_CARD_BYTECODE = "0x60806040523461013e57610014600054610143565b601f81116100f5575b507f4167656e7420436172640000000000000000000000000000000000000000001460005560015461004e90610143565b601f81116100ab575b600a641050d0549160da1b016001908155655af3107a40006004556601c6bf526340006005556006805460ff19169091179055600280546001600160a01b0319163317905560405161257e908161017e8239f35b6001600052601f0160051c7fb10e2d527612073b26eecdfd717e6a320cf44b4afac2b0732d9fcbe2b7fa0cf6908101905b8181106100e95750610057565b600081556001016100dc565b60008052601f0160051c7f290decd9548b62a8d60345a988386fc84ba6bc95484008f6362f93160ef3e563908101905b818110610132575061001d565b60008155600101610125565b600080fd5b90600182811c92168015610173575b602083101461015d57565b634e487b7160e01b600052602260045260246000fd5b91607f169161015256fe608080604052600436101561001357600080fd5b60003560e01c90816301788816146119f95750806301ffc9a71461198b57806306fdde031461196d578063081812fc14611916578063095ea7b31461185c5780631863b5c01461183e57806323b872dd1461182757806324bbd0491461180457806328f567901461142f57806332cb6b0c146114125780633ccfd60b1461137657806342842e0e1461133e578063456cc814146112ff5780636352211e146112cf57806370a082311461128a578063781937e91461125c5780638da5cb5b146112335780638dc10768146111b457806395d89b41146110d3578063a22cb46514611046578063a2309ff814611028578063af46791814610a97578063b88d4fde14610a28578063c76e5459146109fa578063c87b56dd1461029f578063e985e9c514610244578063f2fde38b146101ee578063f737c47a146101d0578063f8004d311461018a5763fa2be9f41461016957600080fd5b3461018557600036600319011261018557602060405160018152f35b600080fd5b3461018557602036600319011261018557600435801515809103610185576101bd60018060a01b03600254163314611eca565b60ff801960065416911617600655600080f35b34610185576000366003190112610185576020600454604051908152f35b3461018557602036600319011261018557610207611b77565b6002549061021f336001600160a01b03841614611eca565b6001600160a01b031690610234821515611f83565b6001600160a01b03191617600255005b346101855760403660031901126101855761025d611b77565b610265611b8d565b9060018060a01b0316600052600c60205260406000209060018060a01b0316600052602052602060ff604060002054166040519015158152f35b34610185576020366003190112610185576004356000818152600960205260409020546102d6906001600160a01b03161515611c6c565b8060005260076020526040600020906040516102f181611a4d565b6102fa83611a8b565b815260ff6001840154166020820190815260ff600361031b60028701611a8b565b604085019081529501541660608301908152815160009060ff168061098e57505060405161034a604082611a69565b601181527006172742d677561726469616e2e7765627607c1b6020820152925b610375815195612139565b9561038360ff8551166121db565b9151905191600160ff8551161460009060001461096857506040516103a9604082611a69565b600481526314185a5960e21b6020820152935b805160009060ff1660010361093d575060ff806040516103dd604082611a69565b60098152685261726520486f6c6f60b81b6020820152975b51169151169080156000146109205750600160ff60785b16910361091757601e81018091116109015761042790612139565b95604051988998683d913730b6b2911d1160b91b60208b01528051908160298c01916020019161045692611b2f565b8901602981016e202d204167656e742043617264202360881b90528151918260388301916020019161048792611b2f565b61088b60f21b603892909101918201527f226465736372697074696f6e223a2241207072656d69756d206d6574616c2041603a8201527f67656e742043617264206f6e20424e4220436861696e2e20546865206d657461605a8201527f6c20636172642066616365202866696e69736820696e2074686520636f6c6f72607a8201527f2073746f726564206f6e2d636861696e2c20656d626f73736564206167656e74609a8201527f206e616d652c20706572736f6e6120617274776f726b292069732072656e646560ba8201527f72656420627920746865206f6666696369616c204167656e742043617264205360da8201527f747564696f20736974652066726f6d2074686973206f6e2d636861696e20646160fa8201527f74612e204120636f6c6c65637469626c6520636172642c206e6f7420616e206f61011a8201527f6666696369616c2042696e616e6365204167656e742049442e222c000000000061013a8201527f22696d616765223a2268747470733a2f2f6167656e74636172642e636c6f7564610155820152672f6173736574732f60c01b610175820152815191602982019161064391849161017d0190602001611b2f565b61088b60f21b61015492909101918201526d2261747472696275746573223a5b60901b6101568201527f7b2274726169745f74797065223a22506572736f6e61222c2276616c7565223a610164820152601160f91b610184820152815191600f8201916106b99184916101850190602001611b2f565b016101450162089f4b60ea1b6031820152603481017f7b2274726169745f74797065223a224167656e74204e616d65222c2276616c7590526332911d1160e11b60548201528151918260588301916020019161071492611b2f565b0160310162089f4b60ea1b6027820152602a81017f7b2274726169745f74797065223a22436f6c6f72222c2276616c7565223a220090528151918260498301916020019161076192611b2f565b0160270162089f4b60ea1b6022820152602581017f7b2274726169745f74797065223a2245646974696f6e222c2276616c7565223a9052601160f91b6045820152815191826046830191602001916107b892611b2f565b0160220162089f4b60ea1b6024820152602781017f7b2274726169745f74797065223a22526172697479222c2276616c7565223a2290528151918260478301916020019161080592611b2f565b0160240162089f4b60ea1b6023820152602681017f7b2274726169745f74797065223a22506f776572222c2276616c7565223a000090528151918260448301916020019161085292611b2f565b0160230160218101607d60f81b905260228101615d7d60f01b905203602101601c19810182526003016108859082611a69565b61088e9061225d565b6040518091602082017f646174613a6170706c69636174696f6e2f6a736f6e3b6261736536342c000000905280519081603d840191602001916108d092611b2f565b810103603d01601f19810182526108e79082611a69565b604051809160208252602082016108fd91611b52565b0390f35b634e487b7160e01b600052601160045260246000fd5b61042790612139565b60010361093257600160ff606e61040c565b600160ff606461040c565b5060ff8060405161094f604082611a69565b600681526521b7b6b6b7b760d11b6020820152976103f5565b50604051610977604082611a69565b60048152634672656560e01b6020820152936103bc565b6001036109c857506040516109a4604082611a69565b601081526f06172742d6275696c6465722e776562760841b60208201525b9261036a565b506040516109d7604082611a69565b601181527006172742d6578706c6f7265722e7765627607c1b60208201526109c2565b3461018557602036600319011261018557610a2060018060a01b03600254163314611eca565b600480359055005b3461018557608036600319011261018557610a41611b77565b610a49611b8d565b906064359060443567ffffffffffffffff831161018557610a9593610a8a610a78610a90953690600401611bdd565b610a83858588611ce9565b3691611fbe565b92612004565b611f1e565b005b610aa036611c0b565b929093919333600052600860205260ff60406000205416610fea57610ac9600454341015611e8b565b3360005260086020526040600020600160ff1982541617905560ff6006541615610fb45760035494612710861015610f8457600183101580610f79575b15610f345760ff169460028611610eff5760078503610ec257610b2890611ff5565b9384600355610b5960405192610b3d84611a4d565b610b48368688611fbe565b845260208401928884523691611fbe565b604083019081526060830191600083528660005260076020526040600020935180519067ffffffffffffffff8211610def57610b958654611a13565b601f8111610e7a575b50602090601f8311600114610e105760ff93929160009183610e05575b50508160011b916000199060031b1c19161785555b511660ff60018501911660ff1982541617905560028301905180519067ffffffffffffffff8211610def57610c058354611a13565b601f8111610da7575b50602090601f8311600114610d3a57928260ff9592938694600396600092610d2f575b50508160011b9160001990871b1c19161790555b51169201911660ff19825416179055826000526009602052604060002060018060a01b0333166bffffffffffffffffffffffff60a01b82541617905533600052600a6020526040600020805492600184018094116109015760209585947f15e0fec784471c79ddd2381bf84f991f82c5a6491770a7f1d040930c9606e5a593558360405192863360007fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef8180a460608452816060850152608084013760006080858401015286820152600060408201526080813394601f80199101168101030190a3604051908152f35b015190508c80610c31565b90601f1983169184600052816000209260005b818110610d8f57509360ff969360039693600193838a9810610d77575b505050811b019055610c45565b015160001983891b60f8161c191690558c8080610d6a565b92936020600181928786015181550195019301610d4d565b836000526020600020601f840160051c81019160208510610de5575b601f0160051c01905b818110610dd95750610c0e565b60008155600101610dcc565b9091508190610dc3565b634e487b7160e01b600052604160045260246000fd5b015190508b80610bbb565b90601f1983169187600052816000209260005b818110610e62575091600193918560ff97969410610e49575b505050811b018555610bd0565b015160001960f88460031b161c191690558b8080610e3c565b92936020600181928786015181550195019301610e23565b866000526020600020601f840160051c81019160208510610eb8575b601f0160051c01905b818110610eac5750610b9e565b60008155600101610e9f565b9091508190610e96565b60405162461bcd60e51b815260206004820152601560248201527421b7b637b91036bab9ba1031329011a92923a3a12160591b6044820152606490fd5b60405162461bcd60e51b815260206004820152600d60248201526c556e6b6e6f776e207374796c6560981b6044820152606490fd5b60405162461bcd60e51b815260206004820152601760248201527f4e616d65206d75737420626520312d33322063686172730000000000000000006044820152606490fd5b506020831115610b06565b60405162461bcd60e51b815260206004820152600860248201526714dbdb19081bdd5d60c21b6044820152606490fd5b60405162461bcd60e51b815260206004820152600e60248201526d135a5b9d081a5cc818db1bdcd95960921b6044820152606490fd5b60405162461bcd60e51b8152602060048201526016602482015275119c9959481b5a5b9d08185b1c9958591e481d5cd95960521b6044820152606490fd5b34610185576000366003190112610185576020600354604051908152f35b346101855760403660031901126101855761105f611b77565b602435908115158092036101855733600052600c602052604060002060018060a01b038216600052602052604060002060ff1981541660ff841617905560405191825260018060a01b0316907f17307eab39ab6107e8899845ad3d59bd9653f200f220920489ca2b5937696c3160203392a3005b346101855760003660031901126101855760405160006001546110f581611a13565b80845290600181169081156111905750600114611131575b6108fd8361111d81850382611a69565b604051918291602083526020830190611b52565b600160009081527fb10e2d527612073b26eecdfd717e6a320cf44b4afac2b0732d9fcbe2b7fa0cf6939250905b8082106111765750909150810160200161111d61110d565b91926001816020925483858801015201910190929161115e565b60ff191660208086019190915291151560051b8401909101915061111d905061110d565b3461018557602036600319011261018557600435600052600760205261121660406000206111e181611a8b565b9061122960ff60018301541660ff60036111fd60028601611a8b565b9401541692604051958695608087526080870190611b52565b9160208601528482036040860152611b52565b9060608301520390f35b34610185576000366003190112610185576002546040516001600160a01b039091168152602090f35b346101855760203660031901126101855761128260018060a01b03600254163314611eca565b600435600555005b34610185576020366003190112610185576001600160a01b036112ab611b77565b166112b7811515611f83565b600052600a6020526020604060002054604051908152f35b346101855760203660031901126101855760206112ed600435611f5d565b6040516001600160a01b039091168152f35b34610185576020366003190112610185576001600160a01b03611320611b77565b166000526008602052602060ff604060002054166040519015158152f35b3461018557610a95610a9061135236611ba3565b9061135e828285611ce9565b6040519261136d602085611a69565b60008452612004565b3461018557600036600319011261018557600080808060018060a01b03600254166113a2813314611eca565b47905af13d1561140d573d6113b681611f02565b906113c46040519283611a69565b8152600060203d92013e5b156113d657005b60405162461bcd60e51b815260206004820152600f60248201526e15da5d1a191c985dc819985a5b1959608a1b6044820152606490fd5b6113cf565b346101855760003660031901126101855760206040516127108152f35b61143836611c0b565b929061144b600595939554341015611e8b565b60ff6006541615610fb45760035494612710861015610f84576001831015806117f9575b15610f345760ff169460028611610eff5760078503610ec25761149190611ff5565b93846003556114a660405192610b3d84611a4d565b604083019081526060830191600183528660005260076020526040600020935180519067ffffffffffffffff8211610def576114e28654611a13565b601f81116117b1575b50602090601f83116001146117475760ff9392916000918361173c575b50508160011b916000199060031b1c19161785555b511660ff60018501911660ff1982541617905560028301905180519067ffffffffffffffff8211610def576115528354611a13565b601f81116116f4575b50602090601f831160011461168757928260ff959293869460039660009261167c575b50508160011b9160001990871b1c19161790555b51169201911660ff19825416179055826000526009602052604060002060018060a01b0333166bffffffffffffffffffffffff60a01b82541617905533600052600a6020526040600020805492600184018094116109015760209585947f15e0fec784471c79ddd2381bf84f991f82c5a6491770a7f1d040930c9606e5a593558360405192863360007fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef8180a460608452816060850152608084013760006080858401015286820152600160408201526080813394601f80199101168101030190a3604051908152f35b015190508c8061157e565b90601f1983169184600052816000209260005b8181106116dc57509360ff969360039693600193838a98106116c4575b505050811b019055611592565b015160001983891b60f8161c191690558c80806116b7565b9293602060018192878601518155019501930161169a565b836000526020600020601f840160051c81019160208510611732575b601f0160051c01905b818110611726575061155b565b60008155600101611719565b9091508190611710565b015190508b80611508565b90601f1983169187600052816000209260005b818110611799575091600193918560ff97969410611780575b505050811b01855561151d565b015160001960f88460031b161c191690558b8080611773565b9293602060018192878601518155019501930161175a565b866000526020600020601f840160051c810191602085106117ef575b601f0160051c01905b8181106117e357506114eb565b600081556001016117d6565b90915081906117cd565b50602083111561146f565b3461018557600036600319011261018557602060ff600654166040519015158152f35b3461018557610a9561183836611ba3565b91611ce9565b34610185576000366003190112610185576020600554604051908152f35b3461018557604036600319011261018557611875611b77565b602435906001600160a01b0361188a83611f5d565b169081331480156118f3575b61189f90611cac565b6000838152600b6020526040812080546001600160a01b0319166001600160a01b039390931692831790559091907f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b9259080a4005b506000828152600c6020908152604080832033845290915290205460ff16611896565b346101855760203660031901126101855760043560008181526009602052604090205461194d906001600160a01b03161515611c6c565b600052600b602052602060018060a01b0360406000205416604051908152f35b34610185576000366003190112610185576108fd61111d6000611a8b565b346101855760203660031901126101855760043563ffffffff60e01b8116809103610185576020906380ac58cd60e01b81149081156119e8575b81156119d7575b506040519015158152f35b6301ffc9a760e01b149050826119cc565b635b5e139f60e01b811491506119c5565b346101855760003660031901126101855780600060209252f35b90600182811c92168015611a43575b6020831014611a2d57565b634e487b7160e01b600052602260045260246000fd5b91607f1691611a22565b6080810190811067ffffffffffffffff821117610def57604052565b90601f8019910116810190811067ffffffffffffffff821117610def57604052565b9060405191826000825492611a9f84611a13565b8084529360018116908115611b0d5750600114611ac6575b50611ac492500383611a69565b565b90506000929192526020600020906000915b818310611af1575050906020611ac49282010138611ab7565b6020919350806001915483858901015201910190918492611ad8565b905060209250611ac494915060ff191682840152151560051b82010138611ab7565b60005b838110611b425750506000910152565b8181015183820152602001611b32565b90602091611b6b81518092818552858086019101611b2f565b601f01601f1916010190565b600435906001600160a01b038216820361018557565b602435906001600160a01b038216820361018557565b6060906003190112610185576004356001600160a01b038116810361018557906024356001600160a01b0381168103610185579060443590565b9181601f840112156101855782359167ffffffffffffffff8311610185576020838186019501011161018557565b9060606003198301126101855760043567ffffffffffffffff81116101855782611c3791600401611bdd565b9290929160243560ff8116810361018557916044359067ffffffffffffffff821161018557611c6891600401611bdd565b9091565b15611c7357565b60405162461bcd60e51b81526020600482015260116024820152702737b732bc34b9ba32b73a103a37b5b2b760791b6044820152606490fd5b15611cb357565b60405162461bcd60e51b815260206004820152600e60248201526d139bdd08185d5d1a1bdc9a5e995960921b6044820152606490fd5b906001600160a01b03611cfb84611f5d565b168033148015611e6c575b8015611e3e575b611d179150611cac565b611d2083611f5d565b6001600160a01b039283169216829003611e0b576001600160a01b031690611d49821515611f83565b6000838152600b6020526040812080546001600160a01b03191690558390827f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b9258280a480600052600a60205260406000208054906000198201918211610901575581600052600a6020526040600020805490600182018092116109015755600083815260096020526040812080546001600160a01b031916841790557fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef9080a4565b60405162461bcd60e51b815260206004820152600b60248201526a2bb937b7339037bbb732b960a91b6044820152606490fd5b50600052600c602052604060002060018060a01b033316600052602052611d1760ff60406000205416611d0d565b5083600052600b60205260018060a01b03604060002054163314611d06565b15611e9257565b60405162461bcd60e51b815260206004820152601060248201526f24b739bab33334b1b4b2b73a1021272160811b6044820152606490fd5b15611ed157565b60405162461bcd60e51b81526020600482015260096024820152682737ba1037bbb732b960b91b6044820152606490fd5b67ffffffffffffffff8111610def57601f01601f191660200190565b15611f2557565b60405162461bcd60e51b815260206004820152601060248201526f155b9cd85999481c9958da5c1a595b9d60821b6044820152606490fd5b6000908152600960205260409020546001600160a01b0316611f80811515611c6c565b90565b15611f8a57565b60405162461bcd60e51b815260206004820152600c60248201526b5a65726f206164647265737360a01b6044820152606490fd5b929192611fca82611f02565b91611fd86040519384611a69565b829481845281830111610185578281602093846000960137010152565b60001981146109015760010190565b919290803b156120d75761205493600060209460405196879586948593630a85bd0160e11b855233600486015260018060a01b031660248501526044840152608060648401526084830190611b52565b03926001600160a01b03165af1809160009161208d575b50906120775750600090565b6001600160e01b031916630a85bd0160e11b1490565b6020813d6020116120cf575b816120a660209383611a69565b810103126120cb5751906001600160e01b0319821682036120c857503861206b565b80fd5b5080fd5b3d9150612099565b50505050600190565b906120ea82611f02565b6120f76040519182611a69565b8281528092612108601f1991611f02565b0190602036910137565b908151811015612123570160200190565b634e487b7160e01b600052603260045260246000fd5b80156121bb5780600081805b6121a35750612153816120e0565b925b61215e57505090565b6000198101908111610901578091600a8106603001918260301161090157600a9260f81b6001600160f81b03191660001a9061219a9086612112565b53049081612155565b91506121b0600a91611ff5565b910480839291612145565b506040516121ca604082611a69565b60018152600360fc1b602082015290565b60ff16801561223657600114612211576040516121f9604082611a69565b600881526722bc383637b932b960c11b602082015290565b60405161221f604082611a69565b6007815266213ab4b63232b960c91b602082015290565b50604051612245604082611a69565b600881526723bab0b93234b0b760c11b602082015290565b6040519061226c606083611a69565b604082527f4142434445464748494a4b4c4d4e4f505152535455565758595a61626364656660208301527f6768696a6b6c6d6e6f707172737475767778797a303132333435363738392b2f6040830152805115612531578051600281018091116109015760039004600281901b906001600160fe1b038116036109015760208101809111610901576122fd906120e0565b91600090815b8351811015612477576123168185612112565b5160018201808311610901578551600091908110156124715761233a915086612112565b5160f81c5b600283018084116109015786516000919081101561246a57612362915087612112565b5160f81c915b6001600160f81b031961237f60fa83901c87612112565b51169561239961238e82611ff5565b9760001a918a612112565b536001600160f81b0319906123bd9060f41c603016600484901c600f161786612112565b5116946123d76123cc82611ff5565b9660001a9189612112565b536001600160f81b0319906123fb9060021b603c16600684901c6003161785612112565b51169361241561240a82611ff5565b9560001a9188612112565b536001600160f81b03199061242d90603f1684612112565b51169261244761243c82611ff5565b9460001a9187612112565b53600381018091111561230357634e487b7160e01b600052601160045260246000fd5b5091612368565b5061233f565b505090929192600160038251061460001461250757506001198101818111610901576124a5603d9185612112565b536000198101818111610901576124be603d9185612112565b535b6124c9816120e0565b9060005b8181106124db575090925050565b6001906001600160f81b03196124f18288612112565b511660001a6125008286612112565b53016124cd565b60036002915106036124c05760001981018181116109015761252b603d9185612112565b536124c0565b5050604051612541602082611a69565b600081529056fea2646970667358221220c88bb1927bd30964544f88e6a9ec36f13a8e85f7ce42cf560e3dbf9b401731d664736f6c634300081a0033";

const READ_RPCS = ["https://bsc-dataseed.binance.org", "https://bsc.publicnode.com"];

const personaConfig = {
  guardian: { title: "Guardian", cardTitle: "THE GUARDIAN", tagline: "Waspada & tenang", styleIndex: 0 },
  builder: { title: "Builder", cardTitle: "THE BUILDER", tagline: "Kreatif & tekun", styleIndex: 1 },
  explorer: { title: "Explorer", cardTitle: "THE EXPLORER", tagline: "Penasaran & bebas", styleIndex: 2 },
};
const personaByIndex = ["guardian", "builder", "explorer"];

const colorConfig = {
  lime: { label: "Lime / 001", hex: "#D5FA61", ink: "#252922", accent: "#b9d94b" },
  violet: { label: "Violet / 002", hex: "#C7B5FF", ink: "#292536", accent: "#9e8be8" },
  coral: { label: "Coral / 003", hex: "#FF8B74", ink: "#342521", accent: "#e96f59" },
  blue: { label: "Sky / 004", hex: "#78D9EE", ink: "#1f2c30", accent: "#54b7ce" },
};

const state = { name: "nara.ai", persona: "guardian", color: "lime", tier: 0, freeUsed: false, connected: false, address: null, chainId: null };
const heroState = { persona: "guardian", color: "lime" };
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

let chainState = { totalMinted: null, freePrice: null, paidPrice: null, mintOpen: null, maxSupply: 10000, owner: null, loaded: false, error: false };
let chainLoading = false;
let ethersRetryScheduled = false;
let readContract = null;
let signer = null;
let walletContract = null;
let mintedResult = null;
let myCardsScanId = 0;

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => [...document.querySelectorAll(selector)];
const views = ["editorView", "confirmView", "processView", "errorView", "successView"];
let toastTimer;
let processTimers = [];

function hasContract() {
  const a = AGENT_CARD_CONFIG.contractAddress;
  return typeof a === "string" && /^0x[0-9a-fA-F]{40}$/.test(a);
}
function contractAddress() { return AGENT_CARD_CONFIG.contractAddress; }
function pad4(n) { return String(n).padStart(4, "0"); }
function shortAddr(addr) { return addr ? addr.slice(0, 6) + "…" + addr.slice(-4) : ""; }
function explorerTx(hash) { return AGENT_CARD_CONFIG.explorer + "/tx/" + hash; }
function explorerAddress(addr) { return AGENT_CARD_CONFIG.explorer + "/address/" + addr; }
function explorerToken(tokenId) { return AGENT_CARD_CONFIG.explorer + "/token/" + contractAddress() + "?a=" + tokenId; }
function formatBNB(wei) {
  try {
    const s = window.ethers.formatEther(wei);
    return s.includes(".") ? s.replace(/0+$/, "").replace(/\.$/, "") : s;
  } catch (e) { return "—"; }
}
function withTimeout(promise, ms) {
  return Promise.race([promise, new Promise((_, reject) => setTimeout(() => reject(new Error("Waktu habis saat membaca jaringan.")), ms))]);
}
function escapeXml(value) {
  return String(value).replace(/[<>&'"]/g, (char) => ({ "<": "&lt;", ">": "&gt;", "&": "&amp;", "'": "&apos;", '"': "&quot;" }[char]));
}

function glyphMarkup(kind) {
  if (kind === "builder") {
    return '<path d="M50 12 83 31v38L50 88 17 69V31L50 12Z" fill="none" stroke="currentColor" stroke-width="3"/><path d="m17 31 33 19 33-19M50 50v38M33 22l34 19M67 22 33 41" fill="none" stroke="currentColor" stroke-width="2"/><path d="M38 41h24v18H38z" fill="currentColor" opacity=".22"/>';
  }
  if (kind === "explorer") {
    return '<circle cx="50" cy="50" r="34" fill="none" stroke="currentColor" stroke-width="2"/><path d="m62 32-8 22-22 14 8-22 22-14Z" fill="currentColor"/><circle cx="50" cy="50" r="4" fill="#fff"/><path d="M50 8v9M50 83v9M8 50h9M83 50h9" stroke="currentColor" stroke-width="2"/>';
  }
  return '<path d="M50 12 80 24v22c0 20-12 34-30 42C32 80 20 66 20 46V24l30-12Z" fill="none" stroke="currentColor" stroke-width="3"/><path d="m36 50 9 9 20-22" fill="none" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/><circle cx="50" cy="50" r="44" fill="none" stroke="currentColor" stroke-width="1" stroke-dasharray="2 5" opacity=".45"/>';
}

function rawName() { return $("#agentName").value.trim(); }
function validInput() {
  const value = rawName();
  const valid = value.length >= 1 && value.length <= 32 && /^[A-Za-z0-9 ._-]+$/.test(value);
  $("#nameError").hidden = valid;
  $("#agentName").setAttribute("aria-invalid", String(!valid));
  return valid;
}
function getName() { return rawName() || "nama-agent"; }

function activePrice() { return state.tier === 1 ? chainState.paidPrice : chainState.freePrice; }
function editionName(tier) { const t = tier == null ? state.tier : tier; return t === 1 ? "PAID EDITION ★" : "FREE EDITION"; }
function syncTierUI() {
  $$(".tier-option").forEach((option) => {
    const selected = Number(option.dataset.tier) === state.tier;
    option.classList.toggle("is-selected", selected);
    option.setAttribute("aria-pressed", String(selected));
  });
  const note = $("#tierNote");
  if (note) {
    if (chainState.freePrice != null && chainState.paidPrice != null) {
      note.textContent = "Live dari kontrak — Free: " + formatBNB(chainState.freePrice) + " BNB (1x per wallet)" + (state.freeUsed ? " · free mint wallet ini sudah dipakai" : "") + " · Paid: " + formatBNB(chainState.paidPrice) + " BNB (tanpa batas).";
    } else if (hasContract()) {
      note.textContent = "Harga dibaca live dari kontrak begitu data termuat.";
    } else {
      note.textContent = "Harga live tampil begitu kontrak diterbitkan. Free = fee anti-sybil kecil, 1x per wallet. Paid = desain emas premium, tanpa batas.";
    }
  }
}

function nextTokenLabel() {
  if (!hasContract() || chainState.totalMinted == null) return null;
  return "No. " + pad4(chainState.totalMinted + 1);
}

function updateEditionLabels() {
  const label = nextTokenLabel();
  const previewEdition = $("#previewEdition");
  const previewSerial = $("#previewSerial");
  if (previewEdition) previewEdition.textContent = label || editionName();
  if (previewSerial) previewSerial.textContent = label ? label + " · " + editionName() : editionName() + " · PRATINJAU";
  const heroEdition = $("#heroEdition");
  const heroSerial = $("#heroSerial");
  if (heroEdition) heroEdition.textContent = label || "PAID EDITION ★";
  if (heroSerial) heroSerial.textContent = label ? label + " · PAID EDITION ★" : "PAID EDITION ★ · CONTOH";
  const caption = $("#previewSupplyCaption");
  if (caption) {
    caption.textContent = chainState.totalMinted != null
      ? chainState.totalMinted.toLocaleString("id-ID") + " / " + (chainState.maxSupply || 10000).toLocaleString("id-ID") + " TERMINT"
      : "KOLEKSI 10.000 KARTU";
  }
}

function applyEditionToClone(clone, label) {
  const edition = clone.querySelector(".card-edition");
  const serial = clone.querySelector(".card-serial");
  if (edition) edition.textContent = label || editionName();
  if (serial) serial.textContent = label ? label + " · " + editionName() : editionName() + " · PRATINJAU";
}

const tcgData = {
  guardian: { power: 120, ability: "Shield Protocol", abilityText: "Once active, its guard covers the whole party.", moves: [["Aegis Slam", "60"], ["Moon Guard", "90"]] },
  builder: { power: 110, ability: "Rapid Construct", abilityText: "Builds faster than anyone alive.", moves: [["Pixel Forge", "50"], ["Chain Build", "100"]] },
  explorer: { power: 100, ability: "Star Pathfinding", abilityText: "Always finds a brand-new path.", moves: [["Comet Dash", "40"], ["Nova Trail", "110"]] },
};

function fillTcg(cardEl, personaKey, tier) {
  if (!cardEl) return;
  const data = tcgData[personaKey];
  if (!data) return;
  const power = cardEl.querySelector(".tcg-power b");
  if (power) power.textContent = String(data.power + (tier === 1 ? 30 : 0));
  const abilityName = cardEl.querySelector(".tcg-ability-name");
  if (abilityName) abilityName.textContent = data.ability;
  const abilityText = cardEl.querySelector(".tcg-ability-text");
  if (abilityText) abilityText.textContent = data.abilityText;
  cardEl.querySelectorAll(".tcg-move").forEach((row, i) => {
    const move = data.moves[i];
    if (!move) return;
    const nameEl = row.querySelector(".tcg-move-name");
    const dmgEl = row.querySelector(".tcg-move-dmg");
    if (nameEl) nameEl.textContent = move[0];
    if (dmgEl) dmgEl.textContent = move[1];
  });
}

function updateCard() {
  state.name = getName();
  const card = $("#cardPreview");
  card.className = "collectible-card theme-" + state.color + (state.tier === 1 ? " card-paid" : " card-free");
  const chip = card.querySelector(".card-chip");
  if (chip) chip.textContent = state.tier === 1 ? "PREMIUM" : "STANDARD";
  $("#previewName").textContent = state.name;
  $("#previewRole").textContent = personaConfig[state.persona].cardTitle;
  $("#colorName").textContent = colorConfig[state.color].label;
  $("#previewGlyph").innerHTML = glyphMarkup(state.persona);
  card.setAttribute("aria-label", "Pratinjau kartu " + state.name + ", " + personaConfig[state.persona].title);
  fillTcg(card, state.persona, state.tier);
  updateEditionLabels();
  updateCardSlots();
  updateXShare();
}

function updateCardSlots() {
  const original = $("#cardPreview");
  const nextLabel = nextTokenLabel();
  const mintedLabel = mintedResult ? "No. " + pad4(mintedResult.tokenId) : null;
  [["confirmCardSlot", nextLabel], ["successCardSlot", mintedLabel || nextLabel]].forEach(([id, label]) => {
    const slot = document.getElementById(id);
    if (!slot) return;
    const clone = original.cloneNode(true);
    clone.removeAttribute("id");
    clone.setAttribute("aria-hidden", "true");
    const glyph = clone.querySelector("svg");
    if (glyph) glyph.innerHTML = glyphMarkup(state.persona);
    const nameEl = clone.querySelector("strong");
    const roleEl = clone.querySelector(".card-role");
    if (nameEl) nameEl.textContent = state.name;
    if (roleEl) roleEl.textContent = personaConfig[state.persona].cardTitle;
    applyEditionToClone(clone, label);
    slot.replaceChildren(clone);
  });
  const confirmName = $("#confirmName");
  if (confirmName) confirmName.textContent = state.name + " · " + personaConfig[state.persona].title + " · " + editionName();
}

function syncHeroCard() {
  const card = document.getElementById("heroCard");
  if (!card) return;
  card.className = "collectible-card theme-" + heroState.color + " card-paid";
  const role = document.getElementById("heroCardRole");
  const glyph = document.getElementById("heroGlyph");
  const colorName = document.getElementById("heroColorName");
  if (role) role.textContent = personaConfig[heroState.persona].cardTitle;
  if (glyph) glyph.innerHTML = glyphMarkup(heroState.persona);
  if (colorName) colorName.textContent = colorConfig[heroState.color].label;
  card.setAttribute("aria-label", "Contoh kartu nara.ai, " + personaConfig[heroState.persona].title);
  fillTcg(card, heroState.persona, 1);
  updateEditionLabels();
  $$(".hero-persona").forEach((button) => {
    const selected = button.dataset.persona === heroState.persona;
    button.classList.toggle("is-selected", selected);
    button.setAttribute("aria-pressed", String(selected));
  });
  $$(".hero-color-row .color-swatch").forEach((swatch) => {
    const selected = swatch.dataset.color === heroState.color;
    swatch.classList.toggle("is-selected", selected);
    swatch.setAttribute("aria-pressed", String(selected));
  });
}

function updateXShare() {
  const link = document.getElementById("xShareButton");
  if (!link) return;
  let text;
  if (mintedResult) {
    text = "Aku baru saja mint Agent Card #" + pad4(mintedResult.tokenId) + " (" + state.name + ", " + personaConfig[state.persona].title + ") di BNB Chain — metadata 100% on-chain. Bukan Agent ID resmi Binance. Bukti mint: " + explorerTx(mintedResult.txHash);
  } else {
    text = "Aku merancang kartu Agent ID " + state.name + " (" + personaConfig[state.persona].title + ") di Agent Card Studio — mint NFT koleksi di BNB Chain, metadata 100% on-chain. Bukan Agent ID resmi Binance.";
  }
  link.href = "https://x.com/intent/post?text=" + encodeURIComponent(text);
}

function launchConfetti() {
  if (prefersReducedMotion) return;
  const colors = ["#d5fa61", "#c7b5ff", "#ff8b74", "#78d9ee", "#9ab82c"];
  for (let i = 0; i < 34; i += 1) {
    const piece = document.createElement("span");
    piece.className = "confetti-piece";
    piece.setAttribute("aria-hidden", "true");
    piece.style.left = ((i * 29) % 96 + 2) + "%";
    piece.style.background = colors[i % colors.length];
    piece.style.animationDelay = ((i % 9) * 55) + "ms";
    piece.style.animationDuration = (1400 + (i % 5) * 140) + "ms";
    piece.style.transform = "rotate(" + (i * 47) + "deg)";
    document.body.append(piece);
    setTimeout(() => piece.remove(), 2600);
  }
}

function showToast(message) {
  const toast = $("#toast");
  toast.textContent = message;
  toast.classList.add("is-visible");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("is-visible"), 3200);
}

function setStep(step) {
  $$(".step-item").forEach((item) => {
    const n = Number(item.dataset.step);
    item.classList.toggle("is-active", n === step);
    item.classList.toggle("is-done", n < step);
  });
}

function showView(viewId, step) {
  views.forEach((id) => { document.getElementById(id).hidden = id !== viewId; });
  setStep(step);
  const studio = $("#studio");
  if (studio) window.scrollTo({ top: studio.offsetTop - 16, behavior: prefersReducedMotion ? "auto" : "smooth" });
}

/* ---------- Status & data publik dari kontrak ---------- */

function setChainStatus(mode) {
  const pillText = $("#chainStatusText");
  const badge = $("#heroBadge");
  const studioNote = $("#studioNote");
  const contractText = $("#contractStatusText");
  const priceNote = $("#heroPriceNote");
  let pill = "BNB CHAIN · MEMERIKSA…";
  let badgeText = "BNB CHAIN · MEMERIKSA STATUS KONTRAK";
  let note = "Memeriksa status kontrak di BNB Chain…";
  let contractLabel = "MEMERIKSA…";
  let price = "Memeriksa status kontrak di BNB Chain…";
  if (mode === "no-contract") {
    pill = "BNB CHAIN · KONTRAK BELUM DITERBITKAN";
    badgeText = "BNB CHAIN · KONTRAK BELUM DITERBITKAN";
    note = "Kontrak belum diterbitkan.<br />Mint dibuka setelah diterbitkan pemilik.";
    contractLabel = "KONTRAK BELUM DITERBITKAN";
    price = "Kontrak belum diterbitkan — desain tetap bisa dicoba, mint dibuka setelah kontrak diterbitkan pemilik.";
  } else if (mode === "ok" || mode === "closed") {
    const total = chainState.totalMinted != null ? chainState.totalMinted.toLocaleString("id-ID") : "—";
    const max = (chainState.maxSupply || 10000).toLocaleString("id-ID");
    const priceBnb = "Free " + (chainState.freePrice != null ? formatBNB(chainState.freePrice) : "—") + " / Paid " + (chainState.paidPrice != null ? formatBNB(chainState.paidPrice) : "—");
    const openLabel = mode === "ok" ? "MINT TERBUKA" : "MINT DITUTUP";
    pill = "BNB CHAIN · " + openLabel + " · " + total + "/" + max;
    badgeText = "LIVE DI BNB CHAIN · " + openLabel;
    note = openLabel.charAt(0) + openLabel.slice(1).toLowerCase() + " · " + total + " dari " + max + " kartu terbit.<br />Harga: " + priceBnb + " BNB + gas. Free maks 1x per wallet.";
    contractLabel = openLabel;
    price = "Harga live: " + priceBnb + " BNB + gas · " + total + "/" + max + " kartu sudah terbit.";
  } else if (mode === "error") {
    pill = "BNB CHAIN · DATA KONTRAK TIDAK TERBACA";
    badgeText = "BNB CHAIN · DATA KONTRAK TIDAK TERBACA";
    note = "Data kontrak tidak terbaca saat ini.<br />Coba muat ulang halaman.";
    contractLabel = "DATA TIDAK TERBACA";
    price = "Data kontrak tidak terbaca saat ini — periksa koneksimu lalu muat ulang halaman.";
  } else if (mode === "no-ethers") {
    pill = "BNB CHAIN · PUSTAKA WALLET GAGAL DIMUAT";
    badgeText = "BNB CHAIN · PUSTAKA WALLET GAGAL DIMUAT";
    note = "Pustaka wallet gagal dimuat.<br />Periksa koneksi lalu muat ulang.";
    contractLabel = "PUSTAKA GAGAL DIMUAT";
    price = "Pustaka wallet gagal dimuat — periksa koneksimu lalu muat ulang halaman.";
  }
  if (pillText) pillText.textContent = pill;
  if (badge) badge.innerHTML = "<i aria-hidden=\"true\"></i> " + escapeXml(badgeText);
  if (studioNote) studioNote.innerHTML = note;
  if (contractText) contractText.textContent = contractLabel;
  if (priceNote) priceNote.textContent = price;
}

async function loadChainState() {
  if (chainLoading) return;
  if (!window.ethers) {
    setChainStatus("no-ethers");
    if (!ethersRetryScheduled) {
      ethersRetryScheduled = true;
      setTimeout(() => { if (window.ethers) loadChainState(); }, 2500);
    }
    return;
  }
  if (!hasContract()) {
    chainState = { totalMinted: null, freePrice: null, paidPrice: null, mintOpen: null, maxSupply: 10000, owner: null, loaded: false, error: false };
    readContract = null;
    setChainStatus("no-contract");
    updateEditionLabels();
    refreshMintUI();
    updateConfirmReceipt();
    updateOwnerPanel();
    return;
  }
  chainLoading = true;
  setChainStatus("loading");
  let lastError = null;
  for (const rpc of READ_RPCS) {
    try {
      const provider = new window.ethers.JsonRpcProvider(rpc, AGENT_CARD_CONFIG.chainId);
      const c = new window.ethers.Contract(contractAddress(), AGENT_CARD_ABI, provider);
      const [freePrice, paidPrice, total, open, max, ownerAddr] = await withTimeout(
        Promise.all([c.freeMintPrice(), c.paidMintPrice(), c.totalMinted(), c.mintOpen(), c.MAX_SUPPLY(), c.owner()]), 9000
      );
      chainState = {
        totalMinted: Number(total),
        freePrice: freePrice,
        paidPrice: paidPrice,
        mintOpen: Boolean(open),
        maxSupply: Number(max),
        owner: ownerAddr,
        loaded: true,
        error: false,
      };
      readContract = c;
      setChainStatus(chainState.mintOpen ? "ok" : "closed");
      chainLoading = false;
      updateEditionLabels();
      refreshMintUI();
      updateConfirmReceipt();
      updateOwnerPanel();
      return;
    } catch (e) { lastError = e; }
  }
  chainLoading = false;
  chainState.error = true;
  setChainStatus("error");
  refreshMintUI();
  updateConfirmReceipt();
  updateOwnerPanel();
}

function mintBlockedReason() {
  if (!hasContract()) return "Kontrak belum diterbitkan — pemilik akan menerbitkannya dari wallet-nya.";
  if (!chainState.loaded) return "Data kontrak masih dimuat / tidak terbaca.";
  if (!chainState.mintOpen) return "Mint sedang ditutup oleh pemilik kontrak.";
  if (chainState.totalMinted != null && chainState.totalMinted >= chainState.maxSupply) return "Koleksi sudah habis (10.000 kartu).";
  if (!state.connected) return "Hubungkan wallet untuk melanjutkan.";
  if (state.chainId != null && state.chainId !== AGENT_CARD_CONFIG.chainId) return "Ganti jaringan wallet ke BNB Smart Chain (56).";
  if (state.tier === 0 && state.freeUsed) return "Free mint sudah dipakai wallet ini — pilih Paid Edition untuk mint lagi.";
  return null;
}

function refreshMintUI() {
  const blocked = mintBlockedReason();
  const continueButton = $("#continueButton");
  const hint = $("#continueHint");
  const mintButton = $("#mintButton");
  if (continueButton) continueButton.disabled = Boolean(blocked) || !validInputSilent();
  if (hint) hint.textContent = blocked || "Harga mint dibaca live dari kontrak; gas terlihat di wallet sebelum menyetujui.";
  if (mintButton) {
    mintButton.disabled = Boolean(blocked) || !validInputSilent();
    const price = activePrice() != null ? formatBNB(activePrice()) : null;
    mintButton.innerHTML = (state.tier === 1 ? "Mint Paid Edition" : "Mint Free Edition") + (price ? " — " + price + " BNB" : "") + ' <span aria-hidden="true">→</span>';
  }
  syncTierUI();
  updateWalletUI();
}
function validInputSilent() {
  const value = rawName();
  return value.length >= 1 && value.length <= 32 && /^[A-Za-z0-9 ._-]+$/.test(value);
}

function updateConfirmReceipt() {
  const priceEl = $("#confirmPrice");
  const totalEl = $("#confirmTotal");
  const link = $("#confirmContractLink");
  if (link) {
    if (hasContract()) {
      link.textContent = shortAddr(contractAddress());
      link.href = explorerAddress(contractAddress());
    } else {
      link.textContent = "Belum diterbitkan";
      link.href = "#pemilik";
    }
  }
  if (priceEl) {
    priceEl.innerHTML = activePrice() != null
      ? escapeXml(editionName()) + " · " + escapeXml(formatBNB(activePrice())) + " BNB <em>LIVE DARI KONTRAK</em>"
      : "— BNB <em>LIVE DARI KONTRAK</em>";
  }
  if (totalEl) totalEl.textContent = activePrice() != null ? formatBNB(activePrice()) + " BNB" : "— BNB";
}

function updateWalletUI() {
  const label = $("#walletButtonLabel");
  const notice = $("#walletNotice");
  const connectedBox = $("#walletConnected");
  const addrEl = $("#connectedAddress");
  const netEl = $("#connectedNetwork");
  if (state.connected && state.address) {
    if (label) label.textContent = shortAddr(state.address);
    if (notice) notice.hidden = true;
    if (connectedBox) connectedBox.hidden = false;
    if (addrEl) addrEl.textContent = state.address;
    if (netEl) netEl.textContent = state.chainId === 56 ? "BNB Smart Chain (56)" : (state.chainId ? "Jaringan lain (" + state.chainId + ") — ganti ke 56" : "BNB Smart Chain");
  } else {
    if (label) label.textContent = "Hubungkan Wallet";
    if (notice) notice.hidden = false;
    if (connectedBox) connectedBox.hidden = true;
  }
}

/* ---------- Wallet asli ---------- */

function showNoWalletGuidance() {
  const text = $("#walletNoticeText");
  if (text) {
    text.innerHTML = "<strong>Tidak ada wallet terdeteksi.</strong><br />Buka halaman ini di browser dalam aplikasi wallet (MetaMask, Trust Wallet, atau Binance Wallet), atau pasang ekstensi wallet di browser desktop.";
  }
  showToast("Tidak ada wallet terdeteksi di browser ini.");
}

async function setupSigner() {
  signer = null;
  walletContract = null;
  if (!window.ethereum || !window.ethers) return;
  try {
    const provider = new window.ethers.BrowserProvider(window.ethereum);
    signer = await provider.getSigner();
    if (hasContract()) walletContract = new window.ethers.Contract(contractAddress(), AGENT_CARD_ABI, signer);
  } catch (e) { signer = null; walletContract = null; }
}

async function ensureChain() {
  if (!window.ethereum) return;
  try {
    const cid = await window.ethereum.request({ method: "eth_chainId" });
    state.chainId = parseInt(cid, 16);
  } catch (e) { state.chainId = null; }
  if (state.chainId === AGENT_CARD_CONFIG.chainId) return;
  try {
    await window.ethereum.request({
      method: "wallet_switchEthereumChain",
      params: [{ chainId: "0x38" }],
    });
    state.chainId = 56;
    showToast("Jaringan dialihkan ke BNB Smart Chain.");
  } catch (err) {
    if (err && err.code === 4902) {
      try {
        await window.ethereum.request({
          method: "wallet_addEthereumChain",
          params: [{
            chainId: "0x38",
            chainName: "BNB Smart Chain",
            nativeCurrency: { name: "BNB", symbol: "BNB", decimals: 18 },
            rpcUrls: ["https://bsc-dataseed.binance.org/"],
            blockExplorerUrls: ["https://bscscan.com"],
          }],
        });
        state.chainId = 56;
      } catch (e2) {
        showToast("Tambahkan jaringan BNB Smart Chain (56) di wallet-mu.");
      }
    } else if (err && err.code === 4001) {
      showToast("Ganti jaringan ke BNB Smart Chain (56) untuk mint.");
    } else {
      showToast("Wallet masih di jaringan lain — ganti ke BNB Smart Chain (56).");
    }
  }
}

async function connectWallet() {
  if (!window.ethers) {
    showToast("Pustaka wallet belum termuat — periksa koneksi lalu coba lagi.");
    return false;
  }
  if (!window.ethereum) { showNoWalletGuidance(); return false; }
  try {
    const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
    if (!accounts || !accounts.length) return false;
    state.connected = true;
    state.address = accounts[0];
    await ensureChain();
    await setupSigner();
    updateWalletUI();
    refreshMintUI();
    updateOwnerPanel();
    loadMyCards();
    showToast("Wallet terhubung: " + shortAddr(state.address));
    return true;
  } catch (e) {
    if (e && (e.code === 4001 || /rejected/i.test(String(e.message || "")))) {
      showToast("Permintaan koneksi ditolak di wallet.");
    } else {
      showToast("Gagal menghubungkan wallet. Coba lagi.");
    }
    return false;
  }
}

function disconnectWallet() {
  state.connected = false;
  state.address = null;
  state.chainId = null;
  signer = null;
  walletContract = null;
  updateWalletUI();
  refreshMintUI();
  updateOwnerPanel();
  const status = $("#myCardsStatus");
  if (status) status.textContent = "Hubungkan wallet untuk melihat kartu NFT milikmu.";
  const grid = $("#myCardsGrid");
  if (grid) grid.replaceChildren();
  showToast("Wallet diputuskan di halaman ini.");
}

function continueToConfirmation() {
  if (!validInput()) {
    $("#agentName").focus();
    showToast("Periksa format nama Agent ID.");
    return;
  }
  const blocked = mintBlockedReason();
  if (blocked) {
    showToast(blocked);
    if (!state.connected) connectWallet();
    return;
  }
  updateCard();
  updateConfirmReceipt();
  refreshMintUI();
  showView("confirmView", 2);
}

/* ---------- Mint asli ---------- */

function friendlyMintError(e) {
  const raw = String((e && (e.reason || e.message || e)) || "");
  const infoMsg = e && e.info && e.info.error ? String(e.info.error.message || "") : "";
  const hay = (raw + " " + infoMsg).toLowerCase();
  if (e && (e.code === 4001 || e.code === "ACTION_REJECTED") || hay.includes("user rejected") || hay.includes("user denied")) {
    return { message: "Kamu menolak transaksi di wallet. Tidak ada BNB yang berpindah dan tidak ada kartu yang diterbitkan.", code: "DITOLAK DI WALLET" };
  }
  if (hay.includes("insufficient funds") || hay.includes("insufficient balance") || hay.includes("saldo")) {
    return { message: "Saldo BNB tidak cukup untuk harga mint ditambah gas jaringan.", code: "SALDO TIDAK CUKUP" };
  }
  if (hay.includes("mint is closed")) {
    return { message: "Mint sedang ditutup oleh pemilik kontrak. Coba lagi nanti.", code: "MINT DITUTUP" };
  }
  if (hay.includes("sold out")) {
    return { message: "Koleksi sudah habis — 10.000 kartu telah terbit.", code: "SOLD OUT" };
  }
  if (hay.includes("name must")) {
    return { message: "Nama harus 1–32 karakter sesuai aturan di studio.", code: "NAMA TIDAK VALID" };
  }
  if (hay.includes("insufficient bnb")) {
    return { message: "BNB yang dikirim kurang dari harga mint kontrak.", code: "BNB KURANG" };
  }
  return { message: "Transaksi gagal. Periksa detailnya, pastikan saldo dan jaringan benar, lalu coba lagi.", code: (e && e.code ? String(e.code) : "TRANSACTION_ERROR").slice(0, 60) };
}

function showErrorView(message, codeText) {
  const msgEl = $("#errorMessage");
  const codeEl = $("#errorCode");
  if (msgEl) msgEl.textContent = message;
  if (codeEl) codeEl.textContent = codeText || "ERROR";
  showView("errorView", 2);
}

function setProcessStep(n) {
  ["#processStep1", "#processStep2", "#processStep3"].forEach((sel, i) => {
    const el = $(sel);
    if (el) el.classList.toggle("is-done", i < n);
  });
}

function clearProcessTimers() {
  processTimers.forEach(clearTimeout);
  processTimers = [];
}

async function runRealMint() {
  if (!validInput()) {
    $("#agentName").focus();
    showToast("Periksa format nama Agent ID.");
    return;
  }
  if (!state.connected) {
    const ok = await connectWallet();
    if (!ok || !state.connected) return;
  }
  if (!hasContract()) {
    showErrorView("Kontrak belum diterbitkan — pemilik akan menerbitkannya dari wallet-nya.", "KONTRAK BELUM DITERBITKAN");
    return;
  }
  await ensureChain();
  if (state.chainId !== AGENT_CARD_CONFIG.chainId) {
    showErrorView("Wallet-mu masih di jaringan lain. Ganti ke BNB Smart Chain (56), lalu coba lagi.", "JARINGAN SALAH");
    return;
  }
  if (!walletContract) await setupSigner();
  if (!walletContract || !signer) {
    showErrorView("Wallet belum siap. Hubungkan ulang wallet-mu lalu coba lagi.", "WALLET BELUM SIAP");
    return;
  }
  try {
    const [freePrice, paidPrice, open, used] = await Promise.all([
      walletContract.freeMintPrice(),
      walletContract.paidMintPrice(),
      walletContract.mintOpen(),
      state.tier === 0 && state.address ? walletContract.freeMintUsed(state.address) : Promise.resolve(false),
    ]);
    chainState.freePrice = freePrice;
    chainState.paidPrice = paidPrice;
    chainState.mintOpen = Boolean(open);
    if (state.tier === 0) state.freeUsed = Boolean(used);
    updateConfirmReceipt();
    if (!chainState.mintOpen) {
      showErrorView("Mint sedang ditutup oleh pemilik kontrak. Coba lagi nanti.", "MINT DITUTUP");
      return;
    }
    if (state.tier === 0 && state.freeUsed) {
      showErrorView("Free mint sudah pernah dipakai wallet ini (maks 1x per wallet). Pilih Paid Edition untuk mint kartu lagi.", "FREE MINT SUDAH DIPAKAI");
      return;
    }
  } catch (e) {
    showErrorView("Harga mint live tidak bisa dibaca dari kontrak. Periksa koneksi lalu coba lagi.", "HARGA TIDAK TERBACA");
    return;
  }

  clearProcessTimers();
  showView("processView", 2);
  setProcessStep(0);
  $("#processTitle").textContent = "Menunggu wallet-mu";
  $("#processMessage").textContent = "Setujui transaksi di wallet-mu. Harga " + formatBNB(activePrice()) + " BNB + gas terlihat di sana sebelum kamu menyetujui. Pembayaran BNB bersifat final.";

  try {
    const mintFn = state.tier === 1 ? walletContract.paidMint : walletContract.freeMint;
    const tx = await mintFn(
      state.name,
      personaConfig[state.persona].styleIndex,
      colorConfig[state.color].hex,
      { value: activePrice() }
    );
    setProcessStep(1);
    $("#processTitle").textContent = "Transaksi terkirim";
    $("#processMessage").textContent = "Hash: " + tx.hash + ". Menunggu konfirmasi di BNB Chain…";
    const receipt = await tx.wait();
    setProcessStep(2);
    let tokenId = null;
    try {
      const iface = new window.ethers.Interface(AGENT_CARD_ABI);
      for (const log of receipt.logs || []) {
        try {
          const parsed = iface.parseLog(log);
          if (parsed && parsed.name === "Transfer" && parsed.args[0] === window.ethers.ZeroAddress) {
            tokenId = Number(parsed.args[2]);
            break;
          }
        } catch (parseErr) { /* log lain, abaikan */ }
      }
    } catch (e) { /* fallback di bawah */ }
    if (tokenId == null) {
      try {
        const total = await readContract.totalMinted();
        tokenId = Number(total);
      } catch (e) { tokenId = (chainState.totalMinted || 0) + 1; }
    }
    mintedResult = { tokenId: tokenId, txHash: receipt.hash || tx.hash, tier: state.tier };
    if (state.tier === 0) state.freeUsed = true;
    setProcessStep(3);
    await loadChainState();
    updateCard();
    showSuccess();
    loadMyCards();
  } catch (e) {
    const friendly = friendlyMintError(e);
    const detail = e && e.message ? String(e.message).slice(0, 140) : "";
    showErrorView(friendly.message, friendly.code + (detail ? " · " + detail : ""));
  }
}

function showSuccess() {
  const tokenId = mintedResult.tokenId;
  const line = $("#successTokenLine");
  if (line) line.innerHTML = "Kartu <strong>No. " + pad4(tokenId) + "</strong> — " + escapeXml(state.name) + " · " + personaConfig[state.persona].title + " — kini milik wallet-mu di BNB Chain.";
  const stamp = $("#successStampNo");
  if (stamp) stamp.textContent = "No. " + pad4(tokenId) + " · " + editionName(mintedResult ? mintedResult.tier : state.tier);
  const txLink = $("#txLinkButton");
  if (txLink) txLink.href = explorerTx(mintedResult.txHash);
  updateCard();
  updateXShare();
  showView("successView", 3);
  launchConfetti();
}

/* ---------- Unduh PNG & bagikan ---------- */

function buildCardSvg(tokenId) {
  const color = colorConfig[state.color];
  const tier = mintedResult ? mintedResult.tier : state.tier;
  const data = tcgData[state.persona];
  const label = escapeXml(state.name);
  const role = escapeXml(personaConfig[state.persona].cardTitle);
  const mark = glyphMarkup(state.persona);
  const ink = color.ink;
  const nameSize = state.name.length <= 14 ? 34 : state.name.length <= 20 ? 28 : state.name.length <= 26 ? 24 : 20;
  const frame = tier === 1
    ? '<rect x="3" y="3" width="414" height="588" rx="16" fill="none" stroke="#b98a1e" stroke-width="6"/><rect x="11" y="11" width="398" height="572" rx="12" fill="none" stroke="#f5d67a" stroke-width="2"/>'
    : '<rect x="6" y="6" width="408" height="582" rx="14" fill="none" stroke="#ffffff" stroke-opacity=".55" stroke-width="2"/>';
  const artOverlay = tier === 1
    ? '<rect x="24" y="112" width="372" height="220" rx="10" fill="url(#holo)" fill-opacity=".35"/>'
    : '<path d="M24 332 L216 112 L306 112 L114 332 Z" fill="#ffffff" fill-opacity=".14"/>';
  const dots = (cy, n) => {
    let out = "";
    for (let i = 0; i < n; i++) out += '<circle cx="' + (40 + i * 18) + '" cy="' + cy + '" r="6.5" fill="' + ink + '"/>';
    return out;
  };
  return '<svg xmlns="http://www.w3.org/2000/svg" width="840" height="1188" viewBox="0 0 420 594">'
    + '<defs><linearGradient id="shine" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#fff" stop-opacity=".5"/><stop offset=".5" stop-color="#fff" stop-opacity="0"/><stop offset="1" stop-color="#26301b" stop-opacity=".13"/></linearGradient>'
    + '<linearGradient id="holo" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#ff8a8a"/><stop offset=".25" stop-color="#ffd98a"/><stop offset=".5" stop-color="#a8ffb0"/><stop offset=".75" stop-color="#8ac6ff"/><stop offset="1" stop-color="#d38aff"/></linearGradient></defs>'
    + '<rect width="420" height="594" rx="18" fill="' + color.hex + '"/><rect width="420" height="594" rx="18" fill="url(#shine)"/>' + frame
    + '<text x="26" y="42" font-family="Arial,sans-serif" font-size="13" font-weight="700" letter-spacing="3" fill="' + ink + '">&#10035; AGENT CARD</text>'
    + '<text x="394" y="42" text-anchor="end" font-family="monospace" font-size="12" letter-spacing="2" fill="' + ink + '" fill-opacity=".75">' + escapeXml(editionName(tier)) + "</text>"
    + '<text x="26" y="80" font-family="Arial,sans-serif" font-size="' + nameSize + '" font-weight="700" fill="' + ink + '">' + label + "</text>"
    + '<text x="330" y="80" text-anchor="end" font-family="Arial,sans-serif" font-size="13" fill="' + ink + '" fill-opacity=".75">PWR</text>'
    + '<text x="394" y="80" text-anchor="end" font-family="Arial,sans-serif" font-size="26" font-weight="700" fill="' + ink + '">' + (data.power + (tier === 1 ? 30 : 0)) + "</text>"
    + '<rect x="24" y="112" width="372" height="220" rx="10" fill="' + ink + '" fill-opacity=".1"/>' + artOverlay
    + '<rect x="24" y="112" width="372" height="220" rx="10" fill="none" stroke="' + ink + '" stroke-opacity=".4" stroke-width="1.5"/>'
    + '<g color="' + ink + '" transform="translate(135 142) scale(1.5)">' + mark + "</g>"
    + '<rect x="24" y="348" width="372" height="58" rx="8" fill="' + ink + '" fill-opacity=".09"/>'
    + '<text x="38" y="373" font-family="monospace" font-size="10" letter-spacing="2" fill="' + ink + '" fill-opacity=".65">ABILITY</text>'
    + '<text x="102" y="374" font-family="Arial,sans-serif" font-size="16" font-weight="700" fill="' + ink + '">' + escapeXml(data.ability) + "</text>"
    + '<text x="38" y="394" font-family="Arial,sans-serif" font-size="12.5" fill="' + ink + '" fill-opacity=".85">' + escapeXml(data.abilityText) + "</text>"
    + dots(441, 2)
    + '<text x="84" y="448" font-family="Arial,sans-serif" font-size="16" font-weight="700" fill="' + ink + '">' + escapeXml(data.moves[0][0]) + "</text>"
    + '<text x="394" y="449" text-anchor="end" font-family="Arial,sans-serif" font-size="19" font-weight="700" fill="' + ink + '">' + data.moves[0][1] + "</text>"
    + '<line x1="24" y1="464" x2="396" y2="464" stroke="' + ink + '" stroke-opacity=".2"/>'
    + dots(489, 3)
    + '<text x="102" y="496" font-family="Arial,sans-serif" font-size="16" font-weight="700" fill="' + ink + '">' + escapeXml(data.moves[1][0]) + "</text>"
    + '<text x="394" y="497" text-anchor="end" font-family="Arial,sans-serif" font-size="19" font-weight="700" fill="' + ink + '">' + data.moves[1][1] + "</text>"
    + '<text x="24" y="530" font-family="Arial,sans-serif" font-size="10.5" fill="' + ink + '" fill-opacity=".6">Weakness: Glitch &#183; Resistance: None &#183; Retreat: 1</text>'
    + '<text x="24" y="560" font-family="monospace" font-size="12.5" fill="' + ink + '">No. ' + pad4(tokenId) + " / 10000</text>"
    + '<text x="394" y="560" text-anchor="end" font-family="monospace" font-size="12.5" letter-spacing="2" fill="' + ink + '">' + role + "</text>"
    + '<text x="24" y="582" font-family="monospace" font-size="8" fill="' + ink + '" fill-opacity=".5">BNB CHAIN COLLECTIBLE - NOT AN OFFICIAL BINANCE AGENT ID</text>'
    + "</svg>";
}

async function downloadCard() {
  const tokenId = mintedResult ? mintedResult.tokenId : (chainState.totalMinted != null ? chainState.totalMinted + 1 : 1);
  let svg = null;
  if (mintedResult && readContract) {
    try {
      const meta = decodeTokenUri(await readContract.tokenURI(mintedResult.tokenId));
      if (meta && typeof meta.image === "string" && meta.image.startsWith("data:image/svg+xml;base64,")) {
        const b64img = meta.image.split(",")[1];
        svg = new TextDecoder().decode(Uint8Array.from(atob(b64img), (ch) => ch.charCodeAt(0)));
      }
    } catch (e) { /* fallback ke gambar studio di bawah */ }
  }
  if (!svg) svg = buildCardSvg(tokenId);
  const blob = new Blob([svg], { type: "image/svg+xml;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  try {
    const image = new Image();
    image.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = 840;
      canvas.height = 1188;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
      URL.revokeObjectURL(url);
      canvas.toBlob((png) => {
        if (!png) { showToast("Gagal membuat PNG. Coba lagi."); return; }
        const downloadUrl = URL.createObjectURL(png);
        const link = document.createElement("a");
        link.href = downloadUrl;
        link.download = state.name.replace(/[^a-z0-9]+/gi, "-").toLowerCase() + "-agent-card-" + pad4(tokenId) + ".png";
        document.body.append(link);
        link.click();
        link.remove();
        URL.revokeObjectURL(downloadUrl);
        showToast("Kartu PNG tersimpan.");
      }, "image/png");
    };
    image.onerror = () => { URL.revokeObjectURL(url); showToast("Gagal membuat gambar. Coba lagi."); };
    image.src = url;
  } catch (error) {
    URL.revokeObjectURL(url);
    showToast("Browser tidak dapat membuat gambar saat ini.");
  }
}

function shareText() {
  if (mintedResult) {
    return "Aku baru saja mint Agent Card #" + pad4(mintedResult.tokenId) + " (" + state.name + ", " + personaConfig[state.persona].title + ") di BNB Chain — metadata 100% on-chain. Bukan Agent ID resmi Binance. Bukti mint: " + explorerTx(mintedResult.txHash);
  }
  return "Aku merancang kartu Agent ID " + state.name + " (" + personaConfig[state.persona].title + ") di Agent Card Studio — mint NFT koleksi di BNB Chain, metadata 100% on-chain. Bukan Agent ID resmi Binance.";
}

async function shareCard() {
  const payload = { title: state.name + " — Agent Card", text: shareText() };
  try {
    if (navigator.share) {
      await navigator.share(payload);
      $("#shareFeedback").textContent = "Menu berbagi dibuka.";
      return;
    }
    await navigator.clipboard.writeText(payload.text);
    $("#shareFeedback").textContent = "Teks dibagikan disalin.";
  } catch (error) {
    if (error && error.name === "AbortError") return;
    try {
      const textArea = document.createElement("textarea");
      textArea.value = payload.text;
      document.body.append(textArea);
      textArea.select();
      document.execCommand("copy");
      textArea.remove();
      $("#shareFeedback").textContent = "Teks dibagikan disalin.";
    } catch (copyError) {
      $("#shareFeedback").textContent = "Bagikan tidak tersedia di perangkat ini.";
    }
  }
}

/* ---------- Kartu Saya ---------- */

function decodeTokenUri(uri) {
  const prefix = "data:application/json;base64,";
  const b64 = uri.startsWith(prefix) ? uri.slice(prefix.length) : uri.split(",")[1] || "";
  const bin = atob(b64);
  const bytes = Uint8Array.from(bin, (c) => c.charCodeAt(0));
  return JSON.parse(new TextDecoder().decode(bytes));
}

async function loadMyCards() {
  const status = $("#myCardsStatus");
  const grid = $("#myCardsGrid");
  if (!status || !grid) return;
  const scanId = ++myCardsScanId;
  if (hasContract() && state.connected && state.address && readContract) {
    try { state.freeUsed = Boolean(await readContract.freeMintUsed(state.address)); refreshMintUI(); } catch (e) { /* abaikan */ }
  }
  if (!hasContract()) {
    status.textContent = "Kontrak belum diterbitkan — belum ada kartu yang bisa ditampilkan. Pemilik akan menerbitkannya dari wallet-nya.";
    grid.replaceChildren();
    return;
  }
  if (!state.connected || !state.address) {
    status.textContent = "Hubungkan wallet untuk melihat kartu NFT milikmu.";
    grid.replaceChildren();
    return;
  }
  if (!chainState.loaded) {
    status.textContent = "Memuat data kontrak…";
    await loadChainState();
    if (scanId !== myCardsScanId) return;
  }
  if (!readContract) {
    status.textContent = "Data kontrak tidak terbaca saat ini. Coba muat ulang.";
    grid.replaceChildren();
    return;
  }
  const total = chainState.totalMinted || 0;
  if (total === 0) {
    status.textContent = "Belum ada kartu yang terbit. Jadilah yang pertama mint dari studio di atas.";
    grid.replaceChildren();
    return;
  }
  status.textContent = "Memindai " + total + " kartu di BNB Chain untuk wallet " + shortAddr(state.address) + "…";
  grid.replaceChildren();
  const owned = [];
  const CHUNK = 10;
  for (let start = 1; start <= total; start += CHUNK) {
    if (scanId !== myCardsScanId) return;
    const ids = [];
    for (let id = start; id < Math.min(start + CHUNK, total + 1); id++) ids.push(id);
    const results = await Promise.all(ids.map(async (id) => {
      try {
        const ownerAddr = await withTimeout(readContract.ownerOf(id), 8000);
        return ownerAddr.toLowerCase() === state.address.toLowerCase() ? id : null;
      } catch (e) { return null; }
    }));
    results.forEach((id) => { if (id != null) owned.push(id); });
    status.textContent = "Memindai " + Math.min(start + CHUNK - 1, total) + "/" + total + " kartu… " + owned.length + " milikmu ditemukan.";
  }
  if (scanId !== myCardsScanId) return;
  if (owned.length === 0) {
    status.textContent = "Wallet " + shortAddr(state.address) + " belum memiliki kartu Agent Card. Mint kartu pertamamu dari studio di atas.";
    return;
  }
  status.textContent = owned.length + " kartu milik " + shortAddr(state.address) + " — gambar dirender dari metadata on-chain.";
  for (const id of owned) {
    if (scanId !== myCardsScanId) return;
    try {
      const [cardData, uri] = await Promise.all([
        withTimeout(readContract.cards(id), 8000),
        withTimeout(readContract.tokenURI(id), 8000),
      ]);
      const meta = decodeTokenUri(uri);
      const personaKey = personaByIndex[Number(cardData[1])] || "guardian";
      const article = document.createElement("article");
      article.className = "my-card";
      const img = document.createElement("img");
      img.src = meta.image || "";
      img.alt = "Agent Card No. " + pad4(id) + " — " + cardData[0];
      const title = document.createElement("h3");
      title.textContent = cardData[0];
      const metaLine = document.createElement("p");
      metaLine.textContent = "No. " + pad4(id) + " · " + personaConfig[personaKey].title.toUpperCase() + " · " + cardData[2] + " · " + (Number(cardData[3]) === 1 ? "PAID EDITION ★" : "FREE EDITION");
      const link = document.createElement("a");
      link.href = explorerToken(id);
      link.target = "_blank";
      link.rel = "noopener noreferrer";
      link.textContent = "Lihat di BscScan ↗";
      article.append(img, title, metaLine, link);
      grid.append(article);
    } catch (e) {
      const article = document.createElement("article");
      article.className = "my-card";
      const title = document.createElement("h3");
      title.textContent = "Agent Card No. " + pad4(id);
      const metaLine = document.createElement("p");
      metaLine.textContent = "Metadata kartu ini tidak bisa dibaca saat ini.";
      article.append(title, metaLine);
      grid.append(article);
    }
  }
}

/* ---------- Panel pemilik ---------- */

function openOwnerPanel() {
  const panel = $("#pemilik");
  if (!panel) return;
  panel.hidden = false;
  updateOwnerPanel();
  panel.scrollIntoView({ behavior: prefersReducedMotion ? "auto" : "smooth" });
}

async function updateOwnerPanel() {
  const statusEl = $("#ownerStatusText");
  const deployBlock = $("#deployBlock");
  const controls = $("#ownerControls");
  const nonOwnerNote = $("#ownerNonOwnerNote");
  if (!statusEl) return;
  if (!hasContract()) {
    statusEl.textContent = "Kontrak belum diterbitkan. Alamat kontrak di halaman ini masih kosong — pemilik menerbitkannya dari wallet-nya dengan tombol di bawah.";
    if (deployBlock) deployBlock.hidden = false;
    if (controls) controls.hidden = true;
    if (nonOwnerNote) nonOwnerNote.hidden = true;
    return;
  }
  const ownerAddr = chainState.owner;
  statusEl.innerHTML = "Kontrak terbit di <a href=\"" + explorerAddress(contractAddress()) + "\" target=\"_blank\" rel=\"noopener noreferrer\">" + escapeXml(contractAddress()) + "</a>"
    + (ownerAddr ? " · Owner: " + escapeXml(shortAddr(ownerAddr)) : "")
    + (chainState.paidPrice != null ? " · Free: " + escapeXml(formatBNB(chainState.freePrice)) + " BNB · Paid: " + escapeXml(formatBNB(chainState.paidPrice)) + " BNB" : "")
    + (chainState.mintOpen != null ? " · Mint: " + (chainState.mintOpen ? "terbuka" : "ditutup") : "");
  if (deployBlock) deployBlock.hidden = true;
  const isOwner = state.connected && state.address && ownerAddr && state.address.toLowerCase() === ownerAddr.toLowerCase();
  if (controls) controls.hidden = !isOwner;
  if (nonOwnerNote) nonOwnerNote.hidden = Boolean(isOwner);
  if (isOwner) {
    const mintState = $("#ownerMintStateText");
    if (mintState) mintState.textContent = "Mint: " + (chainState.mintOpen ? "terbuka" : "ditutup");
    const toggleBtn = $("#toggleMintButton");
    if (toggleBtn) toggleBtn.textContent = chainState.mintOpen ? "Tutup mint" : "Buka mint";
    const freeText = $("#ownerCurrentFreeText");
    if (freeText && chainState.freePrice != null) freeText.textContent = formatBNB(chainState.freePrice) + " BNB";
    const paidText = $("#ownerCurrentPaidText");
    if (paidText && chainState.paidPrice != null) paidText.textContent = formatBNB(chainState.paidPrice) + " BNB";
    refreshOwnerBalance();
  }
}

async function refreshOwnerBalance() {
  const el = $("#ownerBalanceText");
  if (!el || !hasContract() || !window.ethers) return;
  try {
    for (const rpc of READ_RPCS) {
      try {
        const provider = new window.ethers.JsonRpcProvider(rpc, AGENT_CARD_CONFIG.chainId);
        const bal = await withTimeout(provider.getBalance(contractAddress()), 8000);
        el.textContent = formatBNB(bal) + " BNB";
        return;
      } catch (e) { /* coba RPC berikutnya */ }
    }
  } catch (e) { el.textContent = "— BNB"; }
}

async function deployContract() {
  const statusEl = $("#deployStatus");
  const button = $("#deployButton");
  if (!window.ethers || !window.ethereum) {
    if (statusEl) statusEl.textContent = "Wallet tidak terdeteksi. Buka halaman ini di browser dalam aplikasi wallet.";
    return;
  }
  if (!state.connected) {
    const ok = await connectWallet();
    if (!ok) return;
  }
  await ensureChain();
  if (state.chainId !== AGENT_CARD_CONFIG.chainId) {
    if (statusEl) statusEl.textContent = "Ganti jaringan wallet ke BNB Smart Chain (56) untuk menerbitkan kontrak.";
    return;
  }
  if (!signer) await setupSigner();
  if (!signer) {
    if (statusEl) statusEl.textContent = "Wallet belum siap. Hubungkan ulang lalu coba lagi.";
    return;
  }
  if (typeof AGENT_CARD_BYTECODE !== "string" || !AGENT_CARD_BYTECODE.startsWith("0x") || AGENT_CARD_BYTECODE.length < 100) {
    if (statusEl) statusEl.textContent = "Bytecode kontrak tidak tersedia di halaman ini.";
    return;
  }
  if (button) button.disabled = true;
  try {
    if (statusEl) statusEl.textContent = "Menunggu tanda tangan deploy di wallet-mu…";
    const factory = new window.ethers.ContractFactory(AGENT_CARD_ABI, AGENT_CARD_BYTECODE, signer);
    const contract = await factory.deploy();
    const deployTx = contract.deploymentTransaction ? contract.deploymentTransaction() : null;
    if (statusEl) statusEl.textContent = "Kontrak terkirim" + (deployTx && deployTx.hash ? " (" + deployTx.hash + ")" : "") + ". Menunggu konfirmasi jaringan…";
    await contract.waitForDeployment();
    const addr = await contract.getAddress();
    AGENT_CARD_CONFIG.contractAddress = addr;
    const result = $("#deployResult");
    const addrText = $("#deployAddressText");
    const scanLink = $("#deployBscScanLink");
    if (result) result.hidden = false;
    if (addrText) addrText.textContent = addr;
    if (scanLink) scanLink.href = explorerAddress(addr);
    if (statusEl) statusEl.textContent = "Kontrak berhasil diterbitkan. Alamatnya sudah aktif di sesi browser ini.";
    showToast("Kontrak terbit: " + shortAddr(addr));
    await loadChainState();
    loadMyCards();
  } catch (e) {
    const friendly = friendlyMintError(e);
    if (statusEl) statusEl.textContent = "Deploy gagal: " + friendly.message;
  } finally {
    if (button) button.disabled = false;
  }
}

async function ownerToggleMint() {
  const feedback = $("#ownerFeedback");
  if (!walletContract) await setupSigner();
  if (!walletContract) { if (feedback) feedback.textContent = "Wallet belum siap."; return; }
  try {
    if (feedback) feedback.textContent = "Mengirim transaksi ubah status mint… setujui di wallet.";
    const tx = await walletContract.setMintOpen(!chainState.mintOpen);
    await tx.wait();
    if (feedback) feedback.textContent = "Status mint diperbarui. Hash: " + tx.hash;
    await loadChainState();
  } catch (e) {
    const friendly = friendlyMintError(e);
    if (feedback) feedback.textContent = "Gagal mengubah status mint: " + friendly.message;
  }
}

async function ownerSetPrice(tier) {
  const feedback = $("#ownerFeedback");
  const input = $(tier === 1 ? "#ownerPaidPriceInput" : "#ownerFreePriceInput");
  const raw = input ? input.value.trim() : "";
  const value = Number(raw);
  if (!raw || !(value >= 0) || !isFinite(value)) {
    if (feedback) feedback.textContent = "Masukkan harga baru dalam BNB (0 atau lebih).";
    return;
  }
  if (!walletContract) await setupSigner();
  if (!walletContract) { if (feedback) feedback.textContent = "Wallet belum siap."; return; }
  try {
    if (feedback) feedback.textContent = "Mengirim transaksi ubah harga… setujui di wallet.";
    const tx = tier === 1
      ? await walletContract.setPaidMintPrice(window.ethers.parseEther(raw))
      : await walletContract.setFreeMintPrice(window.ethers.parseEther(raw));
    await tx.wait();
    if (feedback) feedback.textContent = "Harga " + (tier === 1 ? "paid" : "free") + " mint diubah menjadi " + raw + " BNB. Hash: " + tx.hash;
    await loadChainState();
  } catch (e) {
    const friendly = friendlyMintError(e);
    if (feedback) feedback.textContent = "Gagal mengubah harga: " + friendly.message;
  }
}

async function ownerWithdraw() {
  const feedback = $("#ownerFeedback");
  if (!walletContract) await setupSigner();
  if (!walletContract) { if (feedback) feedback.textContent = "Wallet belum siap."; return; }
  try {
    if (feedback) feedback.textContent = "Mengirim transaksi penarikan… setujui di wallet.";
    const tx = await walletContract.withdraw();
    await tx.wait();
    if (feedback) feedback.textContent = "BNB kontrak ditarik ke wallet owner. Hash: " + tx.hash;
    refreshOwnerBalance();
  } catch (e) {
    const friendly = friendlyMintError(e);
    if (feedback) feedback.textContent = "Gagal menarik BNB: " + friendly.message;
  }
}

/* ---------- Wiring ---------- */

$("#agentName").addEventListener("input", () => {
  updateCard();
  validInput();
  refreshMintUI();
});

$$(".persona-option").forEach((button) => button.addEventListener("click", () => {
  state.persona = button.dataset.persona;
  $$(".persona-option").forEach((option) => {
    const selected = option === button;
    option.classList.toggle("is-selected", selected);
    option.setAttribute("aria-pressed", String(selected));
  });
  updateCard();
}));

$$(".tier-option").forEach((button) => button.addEventListener("click", () => {
  state.tier = Number(button.dataset.tier);
  updateCard();
  refreshMintUI();
  updateConfirmReceipt();
}));

$$(".editor-panel .color-swatch").forEach((button) => button.addEventListener("click", () => {
  state.color = button.dataset.color;
  $$(".editor-panel .color-swatch").forEach((swatch) => {
    const selected = swatch === button;
    swatch.classList.toggle("is-selected", selected);
    swatch.setAttribute("aria-pressed", String(selected));
  });
  updateCard();
}));

$$(".hero-persona").forEach((button) => button.addEventListener("click", () => {
  heroState.persona = button.dataset.persona;
  syncHeroCard();
}));

$$(".hero-color-row .color-swatch").forEach((button) => button.addEventListener("click", () => {
  heroState.color = button.dataset.color;
  syncHeroCard();
}));

$("#heroUseButton").addEventListener("click", () => {
  const personaButton = document.querySelector('.editor-panel .persona-option[data-persona="' + heroState.persona + '"]');
  const colorButton = document.querySelector('.editor-panel .color-swatch[data-color="' + heroState.color + '"]');
  if (personaButton) personaButton.click();
  if (colorButton) colorButton.click();
  showView("editorView", 1);
  document.getElementById("studio").scrollIntoView({ behavior: prefersReducedMotion ? "auto" : "smooth" });
  showToast("Desain " + personaConfig[heroState.persona].title + " · " + colorConfig[heroState.color].label + " diterapkan di studio.");
});

$("#walletButton").addEventListener("click", () => {
  if (state.connected) disconnectWallet();
  else connectWallet();
});
$("#noticeConnect").addEventListener("click", connectWallet);
const disconnectBtn = $("#disconnectButton");
if (disconnectBtn) disconnectBtn.addEventListener("click", disconnectWallet);
$("#continueButton").addEventListener("click", continueToConfirmation);
$("#backToEditor").addEventListener("click", () => showView("editorView", 1));
$("#mintButton").addEventListener("click", runRealMint);
$("#retryButton").addEventListener("click", () => showView("confirmView", 2));
$("#errorBackButton").addEventListener("click", () => showView("editorView", 1));
$("#downloadButton").addEventListener("click", downloadCard);
$("#shareButton").addEventListener("click", shareCard);
$("#makeAnotherButton").addEventListener("click", () => showView("editorView", 1));
const refreshBtn = $("#refreshMyCardsButton");
if (refreshBtn) refreshBtn.addEventListener("click", loadMyCards);
const ownerLink = $("#ownerFooterLink");
if (ownerLink) ownerLink.addEventListener("click", (event) => { event.preventDefault(); openOwnerPanel(); });
const ownerClose = $("#ownerCloseButton");
if (ownerClose) ownerClose.addEventListener("click", () => { $("#pemilik").hidden = true; });
const deployBtn = $("#deployButton");
if (deployBtn) deployBtn.addEventListener("click", deployContract);
const copyBtn = $("#copyDeployAddressButton");
if (copyBtn) copyBtn.addEventListener("click", async () => {
  try {
    await navigator.clipboard.writeText(contractAddress());
    showToast("Alamat kontrak disalin.");
  } catch (e) { showToast("Salin manual alamat di atas."); }
});
const toggleBtn = $("#toggleMintButton");
if (toggleBtn) toggleBtn.addEventListener("click", ownerToggleMint);
const setFreePriceBtn = $("#setFreePriceButton");
if (setFreePriceBtn) setFreePriceBtn.addEventListener("click", () => ownerSetPrice(0));
const setPaidPriceBtn = $("#setPaidPriceButton");
if (setPaidPriceBtn) setPaidPriceBtn.addEventListener("click", () => ownerSetPrice(1));
const withdrawBtn = $("#withdrawButton");
if (withdrawBtn) withdrawBtn.addEventListener("click", ownerWithdraw);

if (window.ethereum && window.ethereum.on) {
  window.ethereum.on("accountsChanged", (accounts) => {
    if (!accounts || !accounts.length) { disconnectWallet(); return; }
    state.address = accounts[0];
    state.connected = true;
    setupSigner().then(() => { updateWalletUI(); refreshMintUI(); updateOwnerPanel(); loadMyCards(); });
  });
  window.ethereum.on("chainChanged", () => {
    state.chainId = null;
    ensureChain().then(() => {
      setupSigner().then(() => { updateWalletUI(); refreshMintUI(); updateOwnerPanel(); });
    });
  });
}

const topbar = document.getElementById("topbar");
const onScroll = () => topbar.classList.toggle("is-scrolled", window.scrollY > 8);
window.addEventListener("scroll", onScroll, { passive: true });
onScroll();

const revealItems = $$(".reveal");
if ("IntersectionObserver" in window && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  revealItems.forEach((item) => revealObserver.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add("is-visible"));
}

$$(".gallery-card").forEach((card) => card.addEventListener("click", () => {
  const personaButton = document.querySelector('.editor-panel .persona-option[data-persona="' + card.dataset.persona + '"]');
  const colorButton = document.querySelector('.editor-panel .color-swatch[data-color="' + card.dataset.color + '"]');
  if (personaButton) personaButton.click();
  if (colorButton) colorButton.click();
  heroState.persona = card.dataset.persona;
  heroState.color = card.dataset.color;
  syncHeroCard();
  showView("editorView", 1);
  showToast("Gaya " + card.dataset.label + " diterapkan di studio.");
}));

const inviteButton = document.getElementById("inviteMakeButton");
if (inviteButton) inviteButton.addEventListener("click", () => showView("editorView", 1));

/* Hero card tilt + moving shine (mouse / touch, skipped for reduced motion) */
const heroStage = document.querySelector(".hero-stage");
const heroCard = document.getElementById("heroCard");
if (heroStage && heroCard && !prefersReducedMotion) {
  let tiltQueued = false;
  const applyTilt = (event) => {
    const rect = heroCard.getBoundingClientRect();
    const px = Math.max(0, Math.min(1, (event.clientX - rect.left) / rect.width));
    const py = Math.max(0, Math.min(1, (event.clientY - rect.top) / rect.height));
    heroCard.style.setProperty("--ry", ((px - 0.5) * 12) + "deg");
    heroCard.style.setProperty("--rx", ((0.5 - py) * 9) + "deg");
    heroCard.style.setProperty("--mx", (px * 100) + "%");
    heroCard.style.setProperty("--my", (py * 100) + "%");
    tiltQueued = false;
  };
  heroStage.addEventListener("pointermove", (event) => {
    if (tiltQueued) return;
    tiltQueued = true;
    requestAnimationFrame(() => applyTilt(event));
  });
  heroStage.addEventListener("pointerleave", () => {
    heroCard.style.setProperty("--rx", "0deg");
    heroCard.style.setProperty("--ry", "0deg");
    heroCard.style.setProperty("--mx", "50%");
    heroCard.style.setProperty("--my", "42%");
  });
}

/* Foil follows the pointer on the studio preview, too */
const previewPanel = document.querySelector(".preview-panel");
const previewCard = document.getElementById("cardPreview");
if (previewPanel && previewCard && !prefersReducedMotion) {
  previewPanel.addEventListener("pointermove", (event) => {
    const rect = previewCard.getBoundingClientRect();
    previewCard.style.setProperty("--mx", Math.max(0, Math.min(100, ((event.clientX - rect.left) / rect.width) * 100)) + "%");
    previewCard.style.setProperty("--my", Math.max(0, Math.min(100, ((event.clientY - rect.top) / rect.height) * 100)) + "%");
  });
}

/* Floating mobile CTA: show after the hero, hide while the studio is in view */
const floatingCta = document.getElementById("floatingCta");
const studioSection = document.getElementById("studio");
function updateFloatingCta() {
  if (!floatingCta || window.innerWidth > 680) {
    if (floatingCta) floatingCta.classList.remove("is-visible");
    document.body.classList.remove("has-floating-cta");
    return;
  }
  const studioRect = studioSection.getBoundingClientRect();
  const studioVisible = studioRect.top < window.innerHeight && studioRect.bottom > 0;
  const show = !studioVisible;
  floatingCta.classList.toggle("is-visible", show);
  document.body.classList.toggle("has-floating-cta", show);
}
let ctaQueued = false;
window.addEventListener("scroll", () => {
  if (ctaQueued) return;
  ctaQueued = true;
  requestAnimationFrame(() => { updateFloatingCta(); ctaQueued = false; });
}, { passive: true });
window.addEventListener("resize", updateFloatingCta);
updateFloatingCta();

syncHeroCard();
updateCard();
refreshMintUI();
loadChainState();

