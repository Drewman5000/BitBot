

const coinFlip = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) ) + min;
}

case 'bitbot':
        let respond = (coinFlip(0, 1)) ? "Yes." : "No.";
        msg.channel.send(respond);
        break;