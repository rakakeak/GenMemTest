import React, {useRef, useState} from 'react';
import {Dimensions, Image, View} from 'react-native';

import {TextItem} from '../../../../App';
import {useTextEditor} from '../../../zustand/useTextEditor';
import DraggableText from '../../DraggableText';
import FloatingEditorPanel from '../../FloatingEditorPanel';
import TemplateModal from '../../TemplateModal';
import CanvasControls from '../CanvasControls';
import CanvasZoom from '../CanvasZoom';
import {styles} from './styles';
import {ZoomableCanvasRef} from '../CanvasZoom/types';

const {width: SCREEN_WIDTH} = Dimensions.get('window');

export default function CanvasEditor() {
  const zoomableRef = useRef<ZoomableCanvasRef>(null);
  const [showTemplateModal, setShowTemplateModal] = useState(false);
  const [templateImage, setTemplateImage] = useState<string | null>(null);
  const [templateImageSize, setTemplateImageSize] = useState<{
    width: number;
    height: number;
  } | null>(null);

  const scaledHeight = templateImageSize
    ? (SCREEN_WIDTH * templateImageSize.height) / templateImageSize.width
    : 300;

  const {
    texts,
    selectedText,
    selectedId,
    setSelectedId,
    addNewText,
    handleUpdateTransform,
    handleCopy,
    updateSelected,
    setTexts,
  } = useTextEditor();

  return (
    <>
      <View
        style={[styles.canvas, {width: SCREEN_WIDTH, height: scaledHeight}]}>
        <CanvasZoom
          ref={zoomableRef}
          gestureEnabled={selectedId === null}
          imageUri={templateImage}
          canvasWidth={SCREEN_WIDTH}
          canvasHeight={scaledHeight}>
          {texts.map((textItem: TextItem) => (
            <DraggableText
              key={textItem.id}
              {...textItem}
              isSelected={textItem.id === selectedId}
              onSelect={setSelectedId}
              onDelete={() => {
                setTexts((prev: TextItem[]) =>
                  prev.filter(t => t.id !== textItem.id),
                );
                if (selectedId === textItem.id) {
                  setSelectedId(null);
                }
              }}
              onUpdateTransform={handleUpdateTransform}
              onCopy={handleCopy}
            />
          ))}
        </CanvasZoom>
      </View>

      <CanvasControls
        onOpenTemplate={() => setShowTemplateModal(true)}
        onAddText={addNewText}
      />

      <TemplateModal
        visible={showTemplateModal}
        onClose={() => setShowTemplateModal(false)}
        onSelect={uri => {
          zoomableRef.current?.resetTransforms();
          Image.getSize(
            uri,
            (width, height) => {
              setTemplateImage(uri);
              setTemplateImageSize({width, height});
              setTexts([]);
              setSelectedId(null);
            },
            () => {
              setTemplateImage(uri);
              setTemplateImageSize(null);
              setTexts([]);
              setSelectedId(null);
            },
          );
        }}
      />

      {selectedText && (
        <FloatingEditorPanel
          fontSize={selectedText.fontSize}
          color={selectedText.color}
          opacity={selectedText.opacity}
          onChangeFontSize={val => updateSelected('fontSize', val)}
          onChangeColor={val => updateSelected('color', val)}
          onChangeOpacity={val => updateSelected('opacity', val)}
          text={selectedText.text}
          onChangeText={val => updateSelected('text', val)}
        />
      )}
    </>
  );
}
