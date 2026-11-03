
/* Agent Card Studio — mint NFT asli di BNB Chain (ERC-721 AgentCard). */
const AGENT_CARD_CONFIG = {
  contractAddress: "",
  chainId: 56,
  chainName: "BNB Smart Chain",
  explorer: "https://bscscan.com",
};

const AGENT_CARD_ABI = [{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"},{"indexed":false,"internalType":"string","name":"agentName","type":"string"},{"indexed":false,"internalType":"uint8","name":"style","type":"uint8"}],"name":"CardMinted","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"Transfer","type":"event"},{"inputs":[],"name":"MAX_SUPPLY","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"cards","outputs":[{"internalType":"string","name":"agentName","type":"string"},{"internalType":"uint8","name":"style","type":"uint8"},{"internalType":"string","name":"colorHex","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"string","name":"agentName","type":"string"},{"internalType":"uint8","name":"style","type":"uint8"},{"internalType":"string","name":"colorHex","type":"string"}],"name":"mint","outputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"mintOpen","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"mintPrice","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"ownerOf","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bool","name":"open","type":"bool"}],"name":"setMintOpen","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"newPrice","type":"uint256"}],"name":"setMintPrice","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"tokenURI","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalMinted","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"withdraw","outputs":[],"stateMutability":"nonpayable","type":"function"}];

const AGENT_CARD_BYTECODE = "0x60806040523461012e576100135f54610132565b601f81116100e7575b507f4167656e742043617264000000000000000000000000000000000000000000145f5560015461004c90610132565b601f811161009f575b600a641050d0549160da1b0160019081556601c6bf526340006004556005805460ff19169091179055600280546001600160a01b0319163317905560405161225d908161016b8239f35b60015f52601f0160051c7fb10e2d527612073b26eecdfd717e6a320cf44b4afac2b0732d9fcbe2b7fa0cf6908101905b8181106100dc5750610055565b5f81556001016100cf565b5f8052601f0160051c7f290decd9548b62a8d60345a988386fc84ba6bc95484008f6362f93160ef3e563908101905b818110610123575061001c565b5f8155600101610116565b5f80fd5b90600182811c92168015610160575b602083101461014c57565b634e487b7160e01b5f52602260045260245ffd5b91607f169161014156fe6080806040526004361015610012575f80fd5b5f3560e01c90816301ffc9a71461171b5750806306fdde03146116ff578063081812fc146116ab578063095ea7b3146115f357806323b872dd146115dc57806324bbd049146115ba57806332cb6b0c1461159e5780633ccfd60b1461150557806342842e0e146114ce5780636352211e1461149e5780636817c76c1461148157806370a082311461143e5780638da5cb5b146114165780638dc10768146113ac57806395d89b41146112ce578063a22cb46514611245578063a2309ff814611228578063ad60fb7314610caa578063b88d4fde14610c3b578063c87b56dd14610248578063e985e9c5146101f1578063f2fde38b1461019b578063f4a0a5281461016d5763f8004d3114610124575f80fd5b34610169576020366003190112610169576004358015158091036101695761015760018060a01b03600254163314611b4a565b60ff8019600554169116176005555f80f35b5f80fd5b346101695760203660031901126101695761019360018060a01b03600254163314611b4a565b600480359055005b34610169576020366003190112610169576101b46118a4565b600254906101cc336001600160a01b03841614611b4a565b6001600160a01b0316906101e1821515611c02565b6001600160a01b03191617600255005b346101695760403660031901126101695761020a6118a4565b6102126118ba565b9060018060a01b03165f52600a60205260405f209060018060a01b03165f52602052602060ff60405f2054166040519015158152f35b34610169576020366003190112610169576004355f8181526007602052604090205461027e906001600160a01b03161515611938565b805f52600660205260405f209060ff60018301541680155f14610be357506040516102aa6040826117be565b600881526723bab0b93234b0b760c11b6020820152915b60028101906102cf83612189565b604080517f3c73766720786d6c6e733d22687474703a2f2f7777772e77332e6f72672f323060208201527f30302f737667222076696577426f783d223020302036303020333830223e0000918101919091527f3c646566733e3c6c696e6561724772616469656e742069643d2267222078313d605e8201527f2230222079313d2230222078323d2231222079323d2231223e00000000000000607e8201527f3c73746f70206f66667365743d2230222073746f702d636f6c6f723d22000000609782015293846103a260b4820186611c81565b7f222f3e3c73746f70206f66667365743d2231222073746f702d636f6c6f723d2281527f23306431313137222f3e3c2f6c696e6561724772616469656e743e3c2f646566602082015261399f60f11b60408201527f3c726563742077696474683d2236303022206865696768743d2233383022207260428201527f783d223238222066696c6c3d2275726c28236729222f3e00000000000000000060628201527f3c7265637420783d2231342220793d223134222077696474683d22353732222060798201527f6865696768743d22333532222072783d223232222066696c6c3d226e6f6e652260998201527f207374726f6b653d222366666666666622207374726f6b652d6f70616369747960b98201527f3d22302e333522207374726f6b652d77696474683d2232222f3e00000000000060d98201527f3c7265637420783d2234342220793d223532222077696474683d22353222206860f38201527f65696768743d223430222072783d2238222066696c6c3d22236539633436612261011382015261179f60f11b6101338201527f3c7465787420783d2234342220793d223134302220666f6e742d66616d696c796101358201527f3d226d6f6e6f73706163652220666f6e742d73697a653d22313722206c6574746101558201527f65722d73706163696e673d2234222066696c6c3d2223666666666666222066696101758201527f6c6c2d6f7061636974793d22302e3835223e4147454e54204341524420535455610195820152692224a79e17ba32bc3a1f60b11b6101b58201527f3c7465787420783d2234342220793d223230352220666f6e742d66616d696c796101bf8201527f3d2273616e732d73657269662220666f6e742d7765696768743d22626f6c64226101df8201527f20666f6e742d73697a653d223434222066696c6c3d2223666666666666223e006101ff8201526106669061021e0185611c81565b661e17ba32bc3a1f60c91b81527f3c7465787420783d2234342220793d223234382220666f6e742d66616d696c7960078201527f3d226d6f6e6f73706163652220666f6e742d73697a653d22323122206c65747460278201527f65722d73706163696e673d2232222066696c6c3d22236666666666662220666960478201527f6c6c2d6f7061636974793d22302e39223e504552534f4e413a20000000000000606782015287516020890194918186608183015e0160818101661e17ba32bc3a1f60c91b9052608881017f3c7465787420783d2234342220793d223330302220666f6e742d66616d696c79905260a881017f3d226d6f6e6f73706163652220666f6e742d73697a653d223139222066696c6c905260c881017f3d2223666666666666222066696c6c2d6f7061636974793d22302e3735223e4e905260e881016203797160ed1b90528151602081930160eb83015e7f202d2047454e455349532045444954494f4e3c2f746578743e00000000000000910160eb8101919091527f3c7465787420783d2234342220793d223333362220666f6e742d66616d696c796101048201527f3d226d6f6e6f73706163652220666f6e742d73697a653d2231322e35222066696101248201527f6c6c3d2223666666666666222066696c6c2d6f7061636974793d22302e36223e6101448201527f424e4220434841494e20434f4c4c45435449424c45202d204e4f5420414e204f6101648201527f4646494349414c2042494e414e4345204147454e542049443c2f746578743e00610184820152651e17b9bb339f60d11b6101a382015203610189810186526108ce906101a901866117be565b6108d790611e14565b936108e190611eb3565b94604051958695747b226e616d65223a224167656e742043617264202360581b602088015280516020819201603589015e7f222c226465736372697074696f6e223a224120636f6c6c65637469626c6520416035918801918201527f67656e742043617264206d696e746564206f6e20424e4220436861696e2e2050605582015267032b939b7b7309d160c51b60758201528251908185607d83015e01603501604881016d0171020b3b2b73a103730b6b29d160951b90526056016109a69085611c81565b7f2e2054686973206973206120636f6c6c65637469626c652063617264202d206e81527f6f7420616e206f6666696369616c2042696e616e6365204167656e74204944206020808301919091526c18dc9959195b9d1a585b0b888b609a1b60408301527f22696d616765223a22646174613a696d6167652f7376672b786d6c3b62617365604d830152620d8d0b60ea1b606d830152825192839101607083015e01906f222c2261747472696275746573223a5b60801b6070830152608082017f7b2274726169745f74797065223a22506572736f6e61222c2276616c7565223a9052601160f91b60a083015251809260a183015e01607001603181017f227d2c7b2274726169745f74797065223a224167656e74204e616d65222c227690526630b63ab2911d1160c91b6051820152605801610ae191611c81565b7f227d2c7b2274726169745f74797065223a22436f6c6f72222c2276616c7565228152611d1160f11b6020820152602201610b1b91611c81565b7f227d2c7b2274726169745f74797065223a2245646974696f6e222c2276616c7581526e65223a2247656e65736973227d5d7d60881b602082015203600f81018252602f01610b6a90826117be565b610b7390611eb3565b6040518091602082017f646174613a6170706c69636174696f6e2f6a736f6e3b6261736536342c000000905280516020819201603d84015e8101603d81015f905203603d01601f1981018252610bc990826117be565b60405180916020825260208201610bdf91611880565b0390f35b600103610c1357604051610bf86040826117be565b6007815266213ab4b63232b960c91b60208201525b916102c1565b604051610c216040826117be565b600881526722bc383637b932b960c11b6020820152610c0d565b3461016957608036600319011261016957610c546118a4565b610c5c6118ba565b906064359060443567ffffffffffffffff831161016957610ca893610c9d610c8b610ca395369060040161190a565b610c968585886119b5565b3691611c4b565b92611ceb565b611b9e565b005b60603660031901126101695760043567ffffffffffffffff811161016957610cd690369060040161190a565b6024359160ff83168093036101695760443567ffffffffffffffff811161016957610d0590369060040161190a565b60ff60059492945416156111f2576003546127108110156111c257600454341061118a5760018310158061117f575b1561113a576002861161110557600782036110c857610d5290611c3d565b938460035560405190606082019082821067ffffffffffffffff831117610ffd57610d9691604052610d85368688611c4b565b835260208301938885523691611c4b565b9160408201928352855f52600660205260405f20915180519067ffffffffffffffff8211610ffd57610dc88454611786565b601f8111611083575b50602090601f831160011461101c576002949392915f9183611011575b50508160011b915f199060031b1c19161782555b60ff6001830191511660ff1982541617905501905180519067ffffffffffffffff8211610ffd578190610e358454611786565b601f8111610fad575b50602090601f8311600114610f4a575f92610f3f575b50508160011b915f199060031b1c19161790555b5f83815260076020908152604080832080546001600160a01b0319163390811790915583526008909152902080546001810193908410610f2b5760209585947f9e6a9f9a44efe8783affee48da148f2f5899daf9eca355345ac09fa35071e6db9355836040519286335f7fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef8180a46040845281604085015260608401375f60608584010152868201526060813394601f80199101168101030190a3604051908152f35b634e487b7160e01b5f52601160045260245ffd5b015190508780610e54565b5f8581528281209350601f198516905b818110610f955750908460019594939210610f7d575b505050811b019055610e68565b01515f1960f88460031b161c19169055878080610f70565b92936020600181928786015181550195019301610f5a565b909150835f5260205f20601f840160051c81019160208510610ff3575b90601f859493920160051c01905b818110610fe55750610e3e565b5f8155849350600101610fd8565b9091508190610fca565b634e487b7160e01b5f52604160045260245ffd5b015190508a80610dee565b90601f19831691855f52815f20925f5b81811061106b575091600193918560029897969410611053575b505050811b018255610e02565b01515f1960f88460031b161c191690558a8080611046565b9293602060018192878601518155019501930161102c565b845f5260205f20601f840160051c810191602085106110be575b601f0160051c01905b8181106110b35750610dd1565b5f81556001016110a6565b909150819061109d565b60405162461bcd60e51b815260206004820152601560248201527421b7b637b91036bab9ba1031329011a92923a3a12160591b6044820152606490fd5b60405162461bcd60e51b815260206004820152600d60248201526c556e6b6e6f776e207374796c6560981b6044820152606490fd5b60405162461bcd60e51b815260206004820152601760248201527f4e616d65206d75737420626520312d33322063686172730000000000000000006044820152606490fd5b506020831115610d34565b60405162461bcd60e51b815260206004820152601060248201526f24b739bab33334b1b4b2b73a1021272160811b6044820152606490fd5b60405162461bcd60e51b815260206004820152600860248201526714dbdb19081bdd5d60c21b6044820152606490fd5b60405162461bcd60e51b815260206004820152600e60248201526d135a5b9d081a5cc818db1bdcd95960921b6044820152606490fd5b34610169575f366003190112610169576020600354604051908152f35b346101695760403660031901126101695761125e6118a4565b6024359081151580920361016957335f52600a60205260405f2060018060a01b0382165f5260205260405f2060ff1981541660ff841617905560405191825260018060a01b0316907f17307eab39ab6107e8899845ad3d59bd9653f200f220920489ca2b5937696c3160203392a3005b34610169575f366003190112610169576040515f6001546112ee81611786565b8084529060018116908115611388575060011461132a575b610bdf83611316818503826117be565b604051918291602083526020830190611880565b60015f9081527fb10e2d527612073b26eecdfd717e6a320cf44b4afac2b0732d9fcbe2b7fa0cf6939250905b80821061136e57509091508101602001611316611306565b919260018160209254838588010152019101909291611356565b60ff191660208086019190915291151560051b840190910191506113169050611306565b34610169576020366003190112610169576004355f52600660205261140360405f20610bdf6113da826117e0565b916113ef600260ff60018401541692016117e0565b604051948594606086526060860190611880565b9160208501528382036040850152611880565b34610169575f366003190112610169576002546040516001600160a01b039091168152602090f35b34610169576020366003190112610169576001600160a01b0361145f6118a4565b1661146b811515611c02565b5f526008602052602060405f2054604051908152f35b34610169575f366003190112610169576020600454604051908152f35b346101695760203660031901126101695760206114bc600435611bdd565b6040516001600160a01b039091168152f35b3461016957610ca8610ca36114e2366118d0565b906114ee8282856119b5565b604051926114fd6020856117be565b5f8452611ceb565b34610169575f366003190112610169575f80808060018060a01b036002541661152f813314611b4a565b47905af13d15611599573d61154381611b82565b9061155160405192836117be565b81525f60203d92013e5b1561156257005b60405162461bcd60e51b815260206004820152600f60248201526e15da5d1a191c985dc819985a5b1959608a1b6044820152606490fd5b61155b565b34610169575f3660031901126101695760206040516127108152f35b34610169575f36600319011261016957602060ff600554166040519015158152f35b3461016957610ca86115ed366118d0565b916119b5565b346101695760403660031901126101695761160c6118a4565b602435906001600160a01b0361162183611bdd565b16908133148015611689575b61163690611978565b5f83815260096020526040812080546001600160a01b0319166001600160a01b039390931692831790559091907f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b9259080a4005b505f828152600a6020908152604080832033845290915290205460ff1661162d565b34610169576020366003190112610169576004355f818152600760205260409020546116e1906001600160a01b03161515611938565b5f526009602052602060018060a01b0360405f205416604051908152f35b34610169575f36600319011261016957610bdf6113165f6117e0565b34610169576020366003190112610169576004359063ffffffff60e01b8216809203610169576020916380ac58cd60e01b8114908115611775575b8115611764575b5015158152f35b6301ffc9a760e01b1490508361175d565b635b5e139f60e01b81149150611756565b90600182811c921680156117b4575b60208310146117a057565b634e487b7160e01b5f52602260045260245ffd5b91607f1691611795565b90601f8019910116810190811067ffffffffffffffff821117610ffd57604052565b9060405191825f8254926117f384611786565b808452936001811690811561185e575060011461181a575b50611818925003836117be565b565b90505f9291925260205f20905f915b818310611842575050906020611818928201015f61180b565b6020919350806001915483858901015201910190918492611829565b90506020925061181894915060ff191682840152151560051b8201015f61180b565b805180835260209291819084018484015e5f828201840152601f01601f1916010190565b600435906001600160a01b038216820361016957565b602435906001600160a01b038216820361016957565b6060906003190112610169576004356001600160a01b038116810361016957906024356001600160a01b0381168103610169579060443590565b9181601f840112156101695782359167ffffffffffffffff8311610169576020838186019501011161016957565b1561193f57565b60405162461bcd60e51b81526020600482015260116024820152702737b732bc34b9ba32b73a103a37b5b2b760791b6044820152606490fd5b1561197f57565b60405162461bcd60e51b815260206004820152600e60248201526d139bdd08185d5d1a1bdc9a5e995960921b6044820152606490fd5b906001600160a01b036119c784611bdd565b168033148015611b2d575b8015611b03575b6119e39150611978565b6119ec83611bdd565b6001600160a01b039283169216829003611ad0576001600160a01b031690611a15821515611c02565b5f83815260096020526040812080546001600160a01b03191690558390827f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b9258280a4805f52600860205260405f208054905f198201918211610f2b5755815f52600860205260405f2080549060018201809211610f2b57555f83815260076020526040812080546001600160a01b031916841790557fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef9080a4565b60405162461bcd60e51b815260206004820152600b60248201526a2bb937b7339037bbb732b960a91b6044820152606490fd5b505f52600a60205260405f2060018060a01b0333165f526020526119e360ff60405f2054166119d9565b50835f52600960205260018060a01b0360405f20541633146119d2565b15611b5157565b60405162461bcd60e51b81526020600482015260096024820152682737ba1037bbb732b960b91b6044820152606490fd5b67ffffffffffffffff8111610ffd57601f01601f191660200190565b15611ba557565b60405162461bcd60e51b815260206004820152601060248201526f155b9cd85999481c9958da5c1a595b9d60821b6044820152606490fd5b5f908152600760205260409020546001600160a01b0316611bff811515611938565b90565b15611c0957565b60405162461bcd60e51b815260206004820152600c60248201526b5a65726f206164647265737360a01b6044820152606490fd5b5f198114610f2b5760010190565b929192611c5782611b82565b91611c6560405193846117be565b829481845281830111610169578281602093845f960137010152565b5f9291815491611c9083611786565b9260018116908115611cd85750600114611ca957505050565b90919293505f5260205f205f905b838210611cc45750500190565b600181602092548486015201910190611cb7565b60ff191683525050811515909102019150565b919290803b15611db457611d3a935f60209460405196879586948593630a85bd0160e11b855233600486015260018060a01b031660248501526044840152608060648401526084830190611880565b03926001600160a01b03165af15f9181611d6f575b50611d5957505f90565b6001600160e01b031916630a85bd0160e11b1490565b9091506020813d602011611dac575b81611d8b602093836117be565b8101031261016957516001600160e01b03198116810361016957905f611d4f565b3d9150611d7e565b50505050600190565b90611dc782611b82565b611dd460405191826117be565b8281528092611de5601f1991611b82565b0190602036910137565b908151811015611e00570160200190565b634e487b7160e01b5f52603260045260245ffd5b8015611e9357805f81805b611e7b5750611e2d81611dbd565b925b611e3857505090565b5f198101908111610f2b578091600a81066030019182603011610f2b57600a9260f81b6001600160f81b0319165f1a90611e729086611def565b53049081611e2f565b9150611e88600a91611c3d565b910480839291611e1f565b50604051611ea26040826117be565b60018152600360fc1b602082015290565b60405190611ec26060836117be565b604082527f4142434445464748494a4b4c4d4e4f505152535455565758595a61626364656660208301527f6768696a6b6c6d6e6f707172737475767778797a303132333435363738392b2f604083015280511561217357805160028101809111610f2b5760039004600281901b906001600160fe1b03811603610f2b5760208101809111610f2b57611f5390611dbd565b915f905f5b83518110156120be57611f6b8185611def565b5160018201808311610f2b5785518110156120b757611f8a9086611def565b5160f81c5b60028301808411610f2b5786518110156120af57611fad9087611def565b5160f81c915b6001600160f81b0319611fca60fa83901c87611def565b511695611fe3611fd982611c3d565b975f1a918a611def565b536001600160f81b0319906120079060f41c603016600484901c600f161786611def565b51169461202061201682611c3d565b965f1a9189611def565b536001600160f81b0319906120449060021b603c16600684901c6003161785611def565b51169361205d61205382611c3d565b955f1a9188611def565b536001600160f81b03199061207590603f1684611def565b51169261208e61208482611c3d565b945f1a9187611def565b536003810180911115611f5857634e487b7160e01b5f52601160045260245ffd5b505f91611fb3565b505f611f8f565b50509092919260016003825106145f1461214a57506001198101818111610f2b576120eb603d9185611def565b535f198101818111610f2b57612103603d9185611def565b535b61210e81611dbd565b905f5b81811061211f575090925050565b6001906001600160f81b03196121358288611def565b51165f1a6121438286611def565b5301612111565b6003600291510603612105575f198101818111610f2b5761216d603d9185611def565b53612105565b50506040516121836020826117be565b5f815290565b61219290611e14565b600481511015611bff57604051906121ab6040836117be565b60048252602036818401378051806004039060048211610f2b575f5b600481106121d6575050505090565b828110156121fa57600190600360fc1b5b5f1a6121f38288611def565b53016121c7565b8082016003190190808211610f2b576001916001600160f81b0319906122209087611def565b51166121e756fea26469706673582212205872fd907fb0e6c4009e991d620d91edac7004581d6ffd5d06e32284447f582864736f6c634300081a0033";

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

const state = { name: "nara.ai", persona: "guardian", color: "lime", connected: false, address: null, chainId: null };
const heroState = { persona: "guardian", color: "lime" };
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

let chainState = { totalMinted: null, mintPrice: null, mintOpen: null, maxSupply: 10000, owner: null, loaded: false, error: false };
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

function nextTokenLabel() {
  if (!hasContract() || chainState.totalMinted == null) return null;
  return "No. " + pad4(chainState.totalMinted + 1);
}

function updateEditionLabels() {
  const label = nextTokenLabel();
  const previewEdition = $("#previewEdition");
  const previewSerial = $("#previewSerial");
  if (previewEdition) previewEdition.textContent = label || "GENESIS EDITION";
  if (previewSerial) previewSerial.textContent = label ? label + " · GENESIS EDITION" : "GENESIS EDITION · PRATINJAU";
  const heroEdition = $("#heroEdition");
  const heroSerial = $("#heroSerial");
  if (heroEdition) heroEdition.textContent = label || "GENESIS EDITION";
  if (heroSerial) heroSerial.textContent = label ? label + " · GENESIS EDITION" : "GENESIS EDITION · PRATINJAU";
  const caption = $("#previewSupplyCaption");
  if (caption) {
    caption.textContent = chainState.totalMinted != null
      ? chainState.totalMinted.toLocaleString("id-ID") + " / " + (chainState.maxSupply || 10000).toLocaleString("id-ID") + " TERMINT · GENESIS"
      : "KOLEKSI 10.000 · GENESIS";
  }
}

function applyEditionToClone(clone, label) {
  const edition = clone.querySelector(".card-edition");
  const serial = clone.querySelector(".card-serial");
  if (edition) edition.textContent = label || "GENESIS EDITION";
  if (serial) serial.textContent = label ? label + " · GENESIS EDITION" : "GENESIS EDITION · PRATINJAU";
}

function updateCard() {
  state.name = getName();
  const card = $("#cardPreview");
  card.className = "collectible-card theme-" + state.color;
  $("#previewName").textContent = state.name;
  $("#previewRole").textContent = personaConfig[state.persona].cardTitle;
  $("#colorName").textContent = colorConfig[state.color].label;
  $("#previewGlyph").innerHTML = glyphMarkup(state.persona);
  card.setAttribute("aria-label", "Pratinjau kartu " + state.name + ", " + personaConfig[state.persona].title);
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
  if (confirmName) confirmName.textContent = state.name + " · " + personaConfig[state.persona].title;
}

function syncHeroCard() {
  const card = document.getElementById("heroCard");
  if (!card) return;
  card.className = "collectible-card theme-" + heroState.color;
  const role = document.getElementById("heroCardRole");
  const glyph = document.getElementById("heroGlyph");
  const colorName = document.getElementById("heroColorName");
  if (role) role.textContent = personaConfig[heroState.persona].cardTitle;
  if (glyph) glyph.innerHTML = glyphMarkup(heroState.persona);
  if (colorName) colorName.textContent = colorConfig[heroState.color].label;
  card.setAttribute("aria-label", "Contoh kartu nara.ai, " + personaConfig[heroState.persona].title);
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
    const priceBnb = chainState.mintPrice != null ? formatBNB(chainState.mintPrice) : "—";
    const openLabel = mode === "ok" ? "MINT TERBUKA" : "MINT DITUTUP";
    pill = "BNB CHAIN · " + openLabel + " · " + total + "/" + max;
    badgeText = "LIVE DI BNB CHAIN · " + openLabel;
    note = openLabel.charAt(0) + openLabel.slice(1).toLowerCase() + " · " + total + " dari " + max + " kartu terbit.<br />Harga mint " + priceBnb + " BNB + gas.";
    contractLabel = openLabel;
    price = "Harga mint live: " + priceBnb + " BNB + gas · " + total + "/" + max + " kartu sudah terbit.";
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
    chainState = { totalMinted: null, mintPrice: null, mintOpen: null, maxSupply: 10000, owner: null, loaded: false, error: false };
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
      const [price, total, open, max, ownerAddr] = await withTimeout(
        Promise.all([c.mintPrice(), c.totalMinted(), c.mintOpen(), c.MAX_SUPPLY(), c.owner()]), 9000
      );
      chainState = {
        totalMinted: Number(total),
        mintPrice: price,
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
    const price = chainState.mintPrice != null ? formatBNB(chainState.mintPrice) : null;
    mintButton.innerHTML = "Mint NFT" + (price ? " — " + price + " BNB" : "") + ' <span aria-hidden="true">→</span>';
  }
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
    priceEl.innerHTML = chainState.mintPrice != null
      ? escapeXml(formatBNB(chainState.mintPrice)) + " BNB <em>LIVE DARI KONTRAK</em>"
      : "— BNB <em>LIVE DARI KONTRAK</em>";
  }
  if (totalEl) totalEl.textContent = chainState.mintPrice != null ? formatBNB(chainState.mintPrice) + " BNB" : "— BNB";
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
    const [price, open] = await Promise.all([walletContract.mintPrice(), walletContract.mintOpen()]);
    chainState.mintPrice = price;
    chainState.mintOpen = Boolean(open);
    updateConfirmReceipt();
    if (!chainState.mintOpen) {
      showErrorView("Mint sedang ditutup oleh pemilik kontrak. Coba lagi nanti.", "MINT DITUTUP");
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
  $("#processMessage").textContent = "Setujui transaksi di wallet-mu. Harga " + formatBNB(chainState.mintPrice) + " BNB + gas terlihat di sana sebelum kamu menyetujui. Pembayaran BNB bersifat final.";

  try {
    const tx = await walletContract.mint(
      state.name,
      personaConfig[state.persona].styleIndex,
      colorConfig[state.color].hex,
      { value: chainState.mintPrice }
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
    mintedResult = { tokenId: tokenId, txHash: receipt.hash || tx.hash };
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
  if (stamp) stamp.textContent = "No. " + pad4(tokenId) + " · GENESIS";
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
  const label = escapeXml(state.name);
  const role = escapeXml(personaConfig[state.persona].cardTitle);
  const mark = glyphMarkup(state.persona);
  const noLabel = "No. " + pad4(tokenId) + " · GENESIS EDITION";
  return '<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="760" viewBox="0 0 640 405">'
    + '<defs><linearGradient id="shine" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#fff" stop-opacity=".55"/><stop offset=".5" stop-color="#fff" stop-opacity="0"/><stop offset="1" stop-color="#26301b" stop-opacity=".14"/></linearGradient></defs>'
    + '<rect width="640" height="405" rx="18" fill="' + color.hex + '"/><rect width="640" height="405" rx="18" fill="url(#shine)"/>'
    + '<ellipse cx="440" cy="190" rx="165" ry="97" fill="none" stroke="' + color.ink + '" stroke-opacity=".23" transform="rotate(-26 440 190)"/><ellipse cx="440" cy="190" rx="192" ry="119" fill="none" stroke="#fff" stroke-opacity=".25" transform="rotate(-26 440 190)"/>'
    + '<circle cx="500" cy="131" r="34" fill="#fff" fill-opacity=".24"/><circle cx="230" cy="284" r="21" fill="' + color.ink + '" fill-opacity=".13"/>'
    + '<g color="' + color.ink + '" transform="translate(296 104) scale(1.1)">' + mark + "</g>"
    + '<text x="42" y="49" font-family="Arial,sans-serif" font-size="17" font-weight="700" letter-spacing="3" fill="' + color.ink + '">✳  AGENT CARD</text>'
    + '<text x="598" y="49" text-anchor="end" font-family="monospace" font-size="13" letter-spacing="2" fill="' + color.ink + '" fill-opacity=".68">' + escapeXml(noLabel) + "</text>"
    + '<text x="42" y="334" font-family="monospace" font-size="12" letter-spacing="3" fill="' + color.ink + '" fill-opacity=".6">AGENT ID</text>'
    + '<text x="42" y="372" font-family="Arial,sans-serif" font-size="37" font-weight="700" letter-spacing="-2" fill="' + color.ink + '">' + label + "</text>"
    + '<text x="598" y="369" text-anchor="end" font-family="monospace" font-size="13" letter-spacing="2" fill="' + color.ink + '">' + role + "</text>"
    + '<text x="544" y="300" font-family="monospace" font-size="12" letter-spacing="2" text-anchor="end" fill="' + color.ink + '" fill-opacity=".62">BNB / 056</text>'
    + '<text x="588" y="398" text-anchor="end" font-family="Arial,sans-serif" font-size="58" font-weight="800" fill="#fff" fill-opacity=".15">AC</text>'
    + "</svg>";
}

async function downloadCard() {
  const tokenId = mintedResult ? mintedResult.tokenId : (chainState.totalMinted != null ? chainState.totalMinted + 1 : 1);
  const svg = buildCardSvg(tokenId);
  const blob = new Blob([svg], { type: "image/svg+xml;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  try {
    const image = new Image();
    image.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = 1200;
      canvas.height = 760;
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
      metaLine.textContent = "No. " + pad4(id) + " · " + personaConfig[personaKey].title.toUpperCase() + " · " + cardData[2] + " · GENESIS EDITION";
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
    + (chainState.mintPrice != null ? " · Harga mint: " + escapeXml(formatBNB(chainState.mintPrice)) + " BNB" : "")
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
    const priceText = $("#ownerCurrentPriceText");
    if (priceText && chainState.mintPrice != null) priceText.textContent = formatBNB(chainState.mintPrice) + " BNB";
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

async function ownerSetPrice() {
  const feedback = $("#ownerFeedback");
  const input = $("#ownerPriceInput");
  const raw = input ? input.value.trim() : "";
  const value = Number(raw);
  if (!raw || !(value > 0) || !isFinite(value)) {
    if (feedback) feedback.textContent = "Masukkan harga baru dalam BNB, lebih dari 0.";
    return;
  }
  if (!walletContract) await setupSigner();
  if (!walletContract) { if (feedback) feedback.textContent = "Wallet belum siap."; return; }
  try {
    if (feedback) feedback.textContent = "Mengirim transaksi ubah harga… setujui di wallet.";
    const tx = await walletContract.setMintPrice(window.ethers.parseEther(raw));
    await tx.wait();
    if (feedback) feedback.textContent = "Harga mint diubah menjadi " + raw + " BNB. Hash: " + tx.hash;
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
const setPriceBtn = $("#setPriceButton");
if (setPriceBtn) setPriceBtn.addEventListener("click", ownerSetPrice);
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

