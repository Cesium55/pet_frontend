import config from '@/scripts/config';
import { authFetch } from '@/scripts/auth';

function get_media_url(media_path){
    if (media_path)
    return config.s3_url + media_path

    return null
}

async function get_movie_data(id){
    const response = await authFetch(config.movie_get_url(id))
    if (response.ok){
        const data = await response.json()
        return data
    }
    return null
    
}

async function load_subs(subs_object) {
    const loaded_data = {}
    for (let lang in subs_object){
        const url = config.s3_url + subs_object[lang]
        const response = await authFetch(url)
        console.log(response)
        const text = await response.text()
        // console.log(text)
        loaded_data[lang] = text
    }
    return loaded_data
}


class SrtParser {
  constructor(originalSrt, translatedSrt) {
    this.originalSubs = this.parseSrt(originalSrt);
    this.translatedSubs = this.parseSrt(translatedSrt);
  }

  parseSrt(srt) {
    const blocks = srt.trim().split(/\r?\n\r?\n/);
    const subtitles = [];

    for (const block of blocks) {
      const lines = block.split(/\r?\n/);
      if (lines.length >= 3) {
        const timeMatch = lines[1].match(/(\d{2}):(\d{2}):(\d{2}),(\d{3}) --> (\d{2}):(\d{2}):(\d{2}),(\d{3})/);
        if (timeMatch) {
          const startTime = this.timeToSeconds(timeMatch.slice(1, 5));
          const endTime = this.timeToSeconds(timeMatch.slice(5, 9));
          const text = lines.slice(2).join(' ');
          subtitles.push({ startTime, endTime, text });
        }
      }
    }

    return subtitles;
  }

  timeToSeconds([hh, mm, ss, ms]) {
    return (
      parseInt(hh, 10) * 3600 +
      parseInt(mm, 10) * 60 +
      parseInt(ss, 10) +
      parseInt(ms, 10) / 1000
    );
  }

  getSubtitleAt(timeInSeconds) {
    const origText = this.findSubtitle(this.originalSubs, timeInSeconds);
    const transText = this.findSubtitle(this.translatedSubs, timeInSeconds);
    return { original: origText, translated: transText };
  }

  findSubtitle(subs, time) {
    const sub = subs.find(
      ({ startTime, endTime }) => time >= startTime && time <= endTime
    );
    return sub ? sub.text : '';
  }
}


async function get_clip_by_timing(video_id, timing) {
    const response = await authFetch(config.get_clip_by_timing_url(video_id, timing))
    if (!response.ok) return null
    return await response.json()
}



export {get_media_url, get_movie_data, load_subs, SrtParser, get_clip_by_timing}