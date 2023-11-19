import { createEffect, createSignal } from 'solid-js'
import { store } from '../../stores/store'
import styles from './Lyrics.module.scss'
import { Utils } from '../../util/util'
import { mkController } from '../../api/mkController'

export const Lyrics = () => {
  const [autoScroll, setAutoScroll] = createSignal(true)
  let lyricsPane
  const [innerHTML, setInnerHTML] = createSignal(
    store.currentTrack.lyrics.lyricsArray
      .map((script, index) => {
        const linesHTML = script.lines
          .map(
            (line, lineIndex) =>
              `<span id="lyric-${index}-${lineIndex}" data-begin="${line.begin}" data-end="${line.end}" class="lyric-line">${line.text}</span><br/><br/>`
          )
          .join('')
        return `<div id="script-${index}">${linesHTML}</div>`
      })
      .join('')
  )

  createEffect(() => {
    lyricsPane?.querySelectorAll('.lyric-line').forEach(line => {
      line.addEventListener('click', e => {
        const begin = e.target.getAttribute('data-begin')
        mkController.seekToTime(Utils.timecodeToMs(begin) / 1000)
      })

      if (
        Utils.timecodeToMs(line.getAttribute('data-begin')) <= store.currentTime * 1000 &&
        Utils.timecodeToMs(line.getAttribute('data-end')) > store.currentTime * 1000
      ) {
        line.classList.add(styles['activeLyric'])

        if (autoScroll()) {
          lyricsPane.scrollTo({
            // scroll to center
            top: line.offsetTop - lyricsPane.offsetHeight / 2 + 60,
            behavior: 'smooth'
          })
        }
      } else {
        line.classList.remove(styles['activeLyric'])
      }
    })
  })

  return (
    store.currentTrack.lyrics.lyricsArray.length > 0 && (
      <div
        class={[styles.lyrics, styles.blur].join(' ')}
        ref={lyricsPane}
        onMouseEnter={() => {
          setAutoScroll(false)
          lyricsPane.classList.remove(styles.blur)
        }}
        onMouseLeave={() => {
          setAutoScroll(true)
          lyricsPane.classList.add(styles.blur)
        }}
      >
        <div class={styles.lyrics__content}>
          {store.currentTime.toString() <= store.currentTrack.lyrics.begin && (
            <p class={styles.lyrics__content__ellipsis}>...</p>
          )}
          <div class={styles.lyrics__content__text} innerHTML={innerHTML()} />
          <div class={styles.lyrics__content__writtenBy}>
            <p>Written by:</p>
            <span class={styles.lyrics__content__writtenBy__text}>
              {store.currentTrack.lyrics.writtenByArray.join(', ')}
            </span>
          </div>
        </div>
      </div>
    )
  )
}
