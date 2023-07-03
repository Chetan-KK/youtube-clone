const getVideoInfo = async (videoId) => {
    try {
        const fetchedData = await fetch(
            `https://www.googleapis.com/youtube/v3/videos?part=statistics&key=${import.meta.env.VITE_API_KEY
            }&id=${videoId}`
        );
        const convertedData = await fetchedData.json();
        if (!convertedData.items[0]) {
            throw convertedData;
        } else {
            return (convertedData.items[0]);
        }
    } catch (err) {
        return undefined;
    }
};

const getChannelInfo = async (channelId) => {
    try {
        const fetchedData = await fetch(
            `https://www.googleapis.com/youtube/v3/channels?part=snippet&key=${import.meta.env.VITE_API_KEY
            }&id=${channelId}`
        );
        const convertedData = await fetchedData.json();
        if (!convertedData.items[0]) {
            throw convertedData;
        } else {
            return (convertedData.items[0]);
        }
    } catch (err) {
        return undefined;
    }
};

export { getChannelInfo, getVideoInfo };