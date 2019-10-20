import React, {useRef, useEffect} from 'react'
import useCamera from './UseCamera'
import './VideoCapture.css'

const VideoCapture = ({onNewFrame}) => {
    const videoElement = useRef()
    const canvasElement = useRef()
    const cameraStream = useCamera()
    const anim = useRef()

    const canvasWidth = 70
    const canvasHeight = 38

    if (cameraStream) {
        videoElement.current.srcObject = cameraStream
        videoElement.current.play()
    }

    const renderCanvas = () => {
        const context = canvasElement.current.getContext('2d')
        context.drawImage(videoElement.current, 290, 140, 70, 35, 0, 0, canvasWidth, canvasHeight)
        onNewFrame(context.getImageData(0, 0, canvasWidth, canvasHeight))
        anim.current = requestAnimationFrame(renderCanvas)
    }

    useEffect(() => {
        anim.current = requestAnimationFrame(renderCanvas)
        return () => cancelAnimationFrame(anim.current)
    }, [])

    return (
        <div className="videoCaptureContainer">
            <canvas ref={canvasElement} width="70" height="35"></canvas>
            <video className="VideoCapture" ref={videoElement}></video>
        </div>
    )

}

export default VideoCapture
