import { Pause, Play, Volume2 } from "lucide-react";
import { useRef, useState } from "react";

export const BgmPanel = () => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [volume, setVolume] = useState(0.35);
  const [isPlaying, setIsPlaying] = useState(false);
  const [message, setMessage] = useState("BGMは自動再生しません。乾杯前に手動で再生してください。");

  const play = async () => {
    if (!audioRef.current) return;
    audioRef.current.volume = volume;
    try {
      await audioRef.current.play();
      setIsPlaying(true);
      setMessage("夜の集まりっぽい軽めのBGMを再生中です。");
    } catch {
      setMessage("音源ファイルを public/bgm/party-placeholder.mp3 に配置すると再生できます。");
    }
  };

  const stop = () => {
    if (!audioRef.current) return;
    audioRef.current.pause();
    audioRef.current.currentTime = 0;
    setIsPlaying(false);
    setMessage("BGMを停止しました。");
  };

  const updateVolume = (next: number) => {
    setVolume(next);
    if (audioRef.current) audioRef.current.volume = next;
  };

  return (
    <section className="rounded-2xl border border-white/50 bg-white/80 p-5 shadow-glow backdrop-blur">
      <audio ref={audioRef} src={`${import.meta.env.BASE_URL}bgm/party-placeholder.mp3`} loop preload="none" />
      <div className="flex items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold text-slate-900">BGM</h2>
          <p className="mt-1 text-sm text-slate-600">{message}</p>
        </div>
        <div className="flex shrink-0 gap-2">
          <button
            type="button"
            onClick={play}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-pink-500 text-white shadow-sm transition hover:bg-pink-600"
            aria-label="BGM再生"
            title="BGM再生"
          >
            <Play size={18} fill="currentColor" aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={stop}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-slate-900 text-white shadow-sm transition hover:bg-slate-800"
            aria-label="BGM停止"
            title="BGM停止"
          >
            <Pause size={18} fill="currentColor" aria-hidden="true" />
          </button>
        </div>
      </div>
      <label className="mt-4 flex items-center gap-3 text-sm font-medium text-slate-700">
        <Volume2 size={18} aria-hidden="true" />
        <input
          type="range"
          min="0"
          max="1"
          step="0.05"
          value={volume}
          onChange={(event) => updateVolume(Number(event.target.value))}
          className="w-full accent-pink-500"
          aria-label="BGM音量"
        />
        <span className="w-10 text-right">{Math.round(volume * 100)}%</span>
      </label>
      {isPlaying && <p className="mt-3 text-xs text-pink-700">再生中</p>}
    </section>
  );
};
