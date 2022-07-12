function correctTime(sec) {
    let h = sec / 3600 ^ 0;
    let m = (sec - h * 3600) / 60 ^ 0;
    let s = sec - h * 3600 - m * 60
    let formatted = [
        h.toString().padStart(2, '0'),
        m.toString().padStart(2, '0'),
        s.toString().padStart(2, '0')
    ].join(':');
    return formatted
}

export default correctTime