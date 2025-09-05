class VolumeManager {
    // class for video.js player 
    // it saves and re-uses user's volume level



    constructor(player) {
        player.volume(this.getVolume())
        player.on("volumechange", () => {
            this.saveVolume(player.volume());
        });
    }

    saveVolume = (volume) => {
        try {
            localStorage.setItem("videoVolume", volume);
        } catch (e) {
            console.error("Ошибка при сохранении громкости:", e);
        }
    }

    getVolume = () => {
        try {
            const volume = localStorage.getItem("videoVolume");
            return volume !== null ? parseFloat(volume) : 1.0;
        } catch (e) {
            console.error("Ошибка при извлечении громкости:", e);
            return 1.0;
        }
    }

}

export { VolumeManager }